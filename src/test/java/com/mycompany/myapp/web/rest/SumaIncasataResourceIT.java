package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.SumaIncasata;
import com.mycompany.myapp.repository.SumaIncasataRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link SumaIncasataResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SumaIncasataResourceIT {

    private static final Integer DEFAULT_SUMA_INCASATA = 1;
    private static final Integer UPDATED_SUMA_INCASATA = 2;

    private static final LocalDate DEFAULT_DATA_INCASARII = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INCASARII = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/suma-incasatas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SumaIncasataRepository sumaIncasataRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSumaIncasataMockMvc;

    private SumaIncasata sumaIncasata;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SumaIncasata createEntity(EntityManager em) {
        SumaIncasata sumaIncasata = new SumaIncasata().sumaIncasata(DEFAULT_SUMA_INCASATA).dataIncasarii(DEFAULT_DATA_INCASARII);
        return sumaIncasata;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SumaIncasata createUpdatedEntity(EntityManager em) {
        SumaIncasata sumaIncasata = new SumaIncasata().sumaIncasata(UPDATED_SUMA_INCASATA).dataIncasarii(UPDATED_DATA_INCASARII);
        return sumaIncasata;
    }

    @BeforeEach
    public void initTest() {
        sumaIncasata = createEntity(em);
    }

    @Test
    @Transactional
    void createSumaIncasata() throws Exception {
        int databaseSizeBeforeCreate = sumaIncasataRepository.findAll().size();
        // Create the SumaIncasata
        restSumaIncasataMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sumaIncasata)))
            .andExpect(status().isCreated());

        // Validate the SumaIncasata in the database
        List<SumaIncasata> sumaIncasataList = sumaIncasataRepository.findAll();
        assertThat(sumaIncasataList).hasSize(databaseSizeBeforeCreate + 1);
        SumaIncasata testSumaIncasata = sumaIncasataList.get(sumaIncasataList.size() - 1);
        assertThat(testSumaIncasata.getSumaIncasata()).isEqualTo(DEFAULT_SUMA_INCASATA);
        assertThat(testSumaIncasata.getDataIncasarii()).isEqualTo(DEFAULT_DATA_INCASARII);
    }

    @Test
    @Transactional
    void createSumaIncasataWithExistingId() throws Exception {
        // Create the SumaIncasata with an existing ID
        sumaIncasata.setId(1L);

        int databaseSizeBeforeCreate = sumaIncasataRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSumaIncasataMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sumaIncasata)))
            .andExpect(status().isBadRequest());

        // Validate the SumaIncasata in the database
        List<SumaIncasata> sumaIncasataList = sumaIncasataRepository.findAll();
        assertThat(sumaIncasataList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSumaIncasatas() throws Exception {
        // Initialize the database
        sumaIncasataRepository.saveAndFlush(sumaIncasata);

        // Get all the sumaIncasataList
        restSumaIncasataMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sumaIncasata.getId().intValue())))
            .andExpect(jsonPath("$.[*].sumaIncasata").value(hasItem(DEFAULT_SUMA_INCASATA)))
            .andExpect(jsonPath("$.[*].dataIncasarii").value(hasItem(DEFAULT_DATA_INCASARII.toString())));
    }

    @Test
    @Transactional
    void getSumaIncasata() throws Exception {
        // Initialize the database
        sumaIncasataRepository.saveAndFlush(sumaIncasata);

        // Get the sumaIncasata
        restSumaIncasataMockMvc
            .perform(get(ENTITY_API_URL_ID, sumaIncasata.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sumaIncasata.getId().intValue()))
            .andExpect(jsonPath("$.sumaIncasata").value(DEFAULT_SUMA_INCASATA))
            .andExpect(jsonPath("$.dataIncasarii").value(DEFAULT_DATA_INCASARII.toString()));
    }

    @Test
    @Transactional
    void getNonExistingSumaIncasata() throws Exception {
        // Get the sumaIncasata
        restSumaIncasataMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSumaIncasata() throws Exception {
        // Initialize the database
        sumaIncasataRepository.saveAndFlush(sumaIncasata);

        int databaseSizeBeforeUpdate = sumaIncasataRepository.findAll().size();

        // Update the sumaIncasata
        SumaIncasata updatedSumaIncasata = sumaIncasataRepository.findById(sumaIncasata.getId()).get();
        // Disconnect from session so that the updates on updatedSumaIncasata are not directly saved in db
        em.detach(updatedSumaIncasata);
        updatedSumaIncasata.sumaIncasata(UPDATED_SUMA_INCASATA).dataIncasarii(UPDATED_DATA_INCASARII);

        restSumaIncasataMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSumaIncasata.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSumaIncasata))
            )
            .andExpect(status().isOk());

        // Validate the SumaIncasata in the database
        List<SumaIncasata> sumaIncasataList = sumaIncasataRepository.findAll();
        assertThat(sumaIncasataList).hasSize(databaseSizeBeforeUpdate);
        SumaIncasata testSumaIncasata = sumaIncasataList.get(sumaIncasataList.size() - 1);
        assertThat(testSumaIncasata.getSumaIncasata()).isEqualTo(UPDATED_SUMA_INCASATA);
        assertThat(testSumaIncasata.getDataIncasarii()).isEqualTo(UPDATED_DATA_INCASARII);
    }

    @Test
    @Transactional
    void putNonExistingSumaIncasata() throws Exception {
        int databaseSizeBeforeUpdate = sumaIncasataRepository.findAll().size();
        sumaIncasata.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSumaIncasataMockMvc
            .perform(
                put(ENTITY_API_URL_ID, sumaIncasata.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sumaIncasata))
            )
            .andExpect(status().isBadRequest());

        // Validate the SumaIncasata in the database
        List<SumaIncasata> sumaIncasataList = sumaIncasataRepository.findAll();
        assertThat(sumaIncasataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSumaIncasata() throws Exception {
        int databaseSizeBeforeUpdate = sumaIncasataRepository.findAll().size();
        sumaIncasata.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSumaIncasataMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sumaIncasata))
            )
            .andExpect(status().isBadRequest());

        // Validate the SumaIncasata in the database
        List<SumaIncasata> sumaIncasataList = sumaIncasataRepository.findAll();
        assertThat(sumaIncasataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSumaIncasata() throws Exception {
        int databaseSizeBeforeUpdate = sumaIncasataRepository.findAll().size();
        sumaIncasata.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSumaIncasataMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sumaIncasata)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SumaIncasata in the database
        List<SumaIncasata> sumaIncasataList = sumaIncasataRepository.findAll();
        assertThat(sumaIncasataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSumaIncasataWithPatch() throws Exception {
        // Initialize the database
        sumaIncasataRepository.saveAndFlush(sumaIncasata);

        int databaseSizeBeforeUpdate = sumaIncasataRepository.findAll().size();

        // Update the sumaIncasata using partial update
        SumaIncasata partialUpdatedSumaIncasata = new SumaIncasata();
        partialUpdatedSumaIncasata.setId(sumaIncasata.getId());

        partialUpdatedSumaIncasata.sumaIncasata(UPDATED_SUMA_INCASATA).dataIncasarii(UPDATED_DATA_INCASARII);

        restSumaIncasataMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSumaIncasata.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSumaIncasata))
            )
            .andExpect(status().isOk());

        // Validate the SumaIncasata in the database
        List<SumaIncasata> sumaIncasataList = sumaIncasataRepository.findAll();
        assertThat(sumaIncasataList).hasSize(databaseSizeBeforeUpdate);
        SumaIncasata testSumaIncasata = sumaIncasataList.get(sumaIncasataList.size() - 1);
        assertThat(testSumaIncasata.getSumaIncasata()).isEqualTo(UPDATED_SUMA_INCASATA);
        assertThat(testSumaIncasata.getDataIncasarii()).isEqualTo(UPDATED_DATA_INCASARII);
    }

    @Test
    @Transactional
    void fullUpdateSumaIncasataWithPatch() throws Exception {
        // Initialize the database
        sumaIncasataRepository.saveAndFlush(sumaIncasata);

        int databaseSizeBeforeUpdate = sumaIncasataRepository.findAll().size();

        // Update the sumaIncasata using partial update
        SumaIncasata partialUpdatedSumaIncasata = new SumaIncasata();
        partialUpdatedSumaIncasata.setId(sumaIncasata.getId());

        partialUpdatedSumaIncasata.sumaIncasata(UPDATED_SUMA_INCASATA).dataIncasarii(UPDATED_DATA_INCASARII);

        restSumaIncasataMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSumaIncasata.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSumaIncasata))
            )
            .andExpect(status().isOk());

        // Validate the SumaIncasata in the database
        List<SumaIncasata> sumaIncasataList = sumaIncasataRepository.findAll();
        assertThat(sumaIncasataList).hasSize(databaseSizeBeforeUpdate);
        SumaIncasata testSumaIncasata = sumaIncasataList.get(sumaIncasataList.size() - 1);
        assertThat(testSumaIncasata.getSumaIncasata()).isEqualTo(UPDATED_SUMA_INCASATA);
        assertThat(testSumaIncasata.getDataIncasarii()).isEqualTo(UPDATED_DATA_INCASARII);
    }

    @Test
    @Transactional
    void patchNonExistingSumaIncasata() throws Exception {
        int databaseSizeBeforeUpdate = sumaIncasataRepository.findAll().size();
        sumaIncasata.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSumaIncasataMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, sumaIncasata.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sumaIncasata))
            )
            .andExpect(status().isBadRequest());

        // Validate the SumaIncasata in the database
        List<SumaIncasata> sumaIncasataList = sumaIncasataRepository.findAll();
        assertThat(sumaIncasataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSumaIncasata() throws Exception {
        int databaseSizeBeforeUpdate = sumaIncasataRepository.findAll().size();
        sumaIncasata.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSumaIncasataMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sumaIncasata))
            )
            .andExpect(status().isBadRequest());

        // Validate the SumaIncasata in the database
        List<SumaIncasata> sumaIncasataList = sumaIncasataRepository.findAll();
        assertThat(sumaIncasataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSumaIncasata() throws Exception {
        int databaseSizeBeforeUpdate = sumaIncasataRepository.findAll().size();
        sumaIncasata.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSumaIncasataMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(sumaIncasata))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SumaIncasata in the database
        List<SumaIncasata> sumaIncasataList = sumaIncasataRepository.findAll();
        assertThat(sumaIncasataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSumaIncasata() throws Exception {
        // Initialize the database
        sumaIncasataRepository.saveAndFlush(sumaIncasata);

        int databaseSizeBeforeDelete = sumaIncasataRepository.findAll().size();

        // Delete the sumaIncasata
        restSumaIncasataMockMvc
            .perform(delete(ENTITY_API_URL_ID, sumaIncasata.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SumaIncasata> sumaIncasataList = sumaIncasataRepository.findAll();
        assertThat(sumaIncasataList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
