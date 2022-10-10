package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.AlteActivitati;
import com.mycompany.myapp.repository.AlteActivitatiRepository;
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
 * Integration tests for the {@link AlteActivitatiResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AlteActivitatiResourceIT {

    private static final String DEFAULT_COD_CAEN = "AAAAAAAAAA";
    private static final String UPDATED_COD_CAEN = "BBBBBBBBBB";

    private static final String DEFAULT_DENUMIREA = "AAAAAAAAAA";
    private static final String UPDATED_DENUMIREA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/alte-activitatis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AlteActivitatiRepository alteActivitatiRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAlteActivitatiMockMvc;

    private AlteActivitati alteActivitati;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AlteActivitati createEntity(EntityManager em) {
        AlteActivitati alteActivitati = new AlteActivitati().codCAEN(DEFAULT_COD_CAEN).denumirea(DEFAULT_DENUMIREA);
        return alteActivitati;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AlteActivitati createUpdatedEntity(EntityManager em) {
        AlteActivitati alteActivitati = new AlteActivitati().codCAEN(UPDATED_COD_CAEN).denumirea(UPDATED_DENUMIREA);
        return alteActivitati;
    }

    @BeforeEach
    public void initTest() {
        alteActivitati = createEntity(em);
    }

    @Test
    @Transactional
    void createAlteActivitati() throws Exception {
        int databaseSizeBeforeCreate = alteActivitatiRepository.findAll().size();
        // Create the AlteActivitati
        restAlteActivitatiMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(alteActivitati))
            )
            .andExpect(status().isCreated());

        // Validate the AlteActivitati in the database
        List<AlteActivitati> alteActivitatiList = alteActivitatiRepository.findAll();
        assertThat(alteActivitatiList).hasSize(databaseSizeBeforeCreate + 1);
        AlteActivitati testAlteActivitati = alteActivitatiList.get(alteActivitatiList.size() - 1);
        assertThat(testAlteActivitati.getCodCAEN()).isEqualTo(DEFAULT_COD_CAEN);
        assertThat(testAlteActivitati.getDenumirea()).isEqualTo(DEFAULT_DENUMIREA);
    }

    @Test
    @Transactional
    void createAlteActivitatiWithExistingId() throws Exception {
        // Create the AlteActivitati with an existing ID
        alteActivitati.setId(1L);

        int databaseSizeBeforeCreate = alteActivitatiRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlteActivitatiMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(alteActivitati))
            )
            .andExpect(status().isBadRequest());

        // Validate the AlteActivitati in the database
        List<AlteActivitati> alteActivitatiList = alteActivitatiRepository.findAll();
        assertThat(alteActivitatiList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAlteActivitatis() throws Exception {
        // Initialize the database
        alteActivitatiRepository.saveAndFlush(alteActivitati);

        // Get all the alteActivitatiList
        restAlteActivitatiMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alteActivitati.getId().intValue())))
            .andExpect(jsonPath("$.[*].codCAEN").value(hasItem(DEFAULT_COD_CAEN)))
            .andExpect(jsonPath("$.[*].denumirea").value(hasItem(DEFAULT_DENUMIREA)));
    }

    @Test
    @Transactional
    void getAlteActivitati() throws Exception {
        // Initialize the database
        alteActivitatiRepository.saveAndFlush(alteActivitati);

        // Get the alteActivitati
        restAlteActivitatiMockMvc
            .perform(get(ENTITY_API_URL_ID, alteActivitati.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(alteActivitati.getId().intValue()))
            .andExpect(jsonPath("$.codCAEN").value(DEFAULT_COD_CAEN))
            .andExpect(jsonPath("$.denumirea").value(DEFAULT_DENUMIREA));
    }

    @Test
    @Transactional
    void getNonExistingAlteActivitati() throws Exception {
        // Get the alteActivitati
        restAlteActivitatiMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAlteActivitati() throws Exception {
        // Initialize the database
        alteActivitatiRepository.saveAndFlush(alteActivitati);

        int databaseSizeBeforeUpdate = alteActivitatiRepository.findAll().size();

        // Update the alteActivitati
        AlteActivitati updatedAlteActivitati = alteActivitatiRepository.findById(alteActivitati.getId()).get();
        // Disconnect from session so that the updates on updatedAlteActivitati are not directly saved in db
        em.detach(updatedAlteActivitati);
        updatedAlteActivitati.codCAEN(UPDATED_COD_CAEN).denumirea(UPDATED_DENUMIREA);

        restAlteActivitatiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAlteActivitati.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAlteActivitati))
            )
            .andExpect(status().isOk());

        // Validate the AlteActivitati in the database
        List<AlteActivitati> alteActivitatiList = alteActivitatiRepository.findAll();
        assertThat(alteActivitatiList).hasSize(databaseSizeBeforeUpdate);
        AlteActivitati testAlteActivitati = alteActivitatiList.get(alteActivitatiList.size() - 1);
        assertThat(testAlteActivitati.getCodCAEN()).isEqualTo(UPDATED_COD_CAEN);
        assertThat(testAlteActivitati.getDenumirea()).isEqualTo(UPDATED_DENUMIREA);
    }

    @Test
    @Transactional
    void putNonExistingAlteActivitati() throws Exception {
        int databaseSizeBeforeUpdate = alteActivitatiRepository.findAll().size();
        alteActivitati.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlteActivitatiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, alteActivitati.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(alteActivitati))
            )
            .andExpect(status().isBadRequest());

        // Validate the AlteActivitati in the database
        List<AlteActivitati> alteActivitatiList = alteActivitatiRepository.findAll();
        assertThat(alteActivitatiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAlteActivitati() throws Exception {
        int databaseSizeBeforeUpdate = alteActivitatiRepository.findAll().size();
        alteActivitati.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAlteActivitatiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(alteActivitati))
            )
            .andExpect(status().isBadRequest());

        // Validate the AlteActivitati in the database
        List<AlteActivitati> alteActivitatiList = alteActivitatiRepository.findAll();
        assertThat(alteActivitatiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAlteActivitati() throws Exception {
        int databaseSizeBeforeUpdate = alteActivitatiRepository.findAll().size();
        alteActivitati.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAlteActivitatiMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(alteActivitati)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AlteActivitati in the database
        List<AlteActivitati> alteActivitatiList = alteActivitatiRepository.findAll();
        assertThat(alteActivitatiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAlteActivitatiWithPatch() throws Exception {
        // Initialize the database
        alteActivitatiRepository.saveAndFlush(alteActivitati);

        int databaseSizeBeforeUpdate = alteActivitatiRepository.findAll().size();

        // Update the alteActivitati using partial update
        AlteActivitati partialUpdatedAlteActivitati = new AlteActivitati();
        partialUpdatedAlteActivitati.setId(alteActivitati.getId());

        partialUpdatedAlteActivitati.codCAEN(UPDATED_COD_CAEN);

        restAlteActivitatiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAlteActivitati.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAlteActivitati))
            )
            .andExpect(status().isOk());

        // Validate the AlteActivitati in the database
        List<AlteActivitati> alteActivitatiList = alteActivitatiRepository.findAll();
        assertThat(alteActivitatiList).hasSize(databaseSizeBeforeUpdate);
        AlteActivitati testAlteActivitati = alteActivitatiList.get(alteActivitatiList.size() - 1);
        assertThat(testAlteActivitati.getCodCAEN()).isEqualTo(UPDATED_COD_CAEN);
        assertThat(testAlteActivitati.getDenumirea()).isEqualTo(DEFAULT_DENUMIREA);
    }

    @Test
    @Transactional
    void fullUpdateAlteActivitatiWithPatch() throws Exception {
        // Initialize the database
        alteActivitatiRepository.saveAndFlush(alteActivitati);

        int databaseSizeBeforeUpdate = alteActivitatiRepository.findAll().size();

        // Update the alteActivitati using partial update
        AlteActivitati partialUpdatedAlteActivitati = new AlteActivitati();
        partialUpdatedAlteActivitati.setId(alteActivitati.getId());

        partialUpdatedAlteActivitati.codCAEN(UPDATED_COD_CAEN).denumirea(UPDATED_DENUMIREA);

        restAlteActivitatiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAlteActivitati.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAlteActivitati))
            )
            .andExpect(status().isOk());

        // Validate the AlteActivitati in the database
        List<AlteActivitati> alteActivitatiList = alteActivitatiRepository.findAll();
        assertThat(alteActivitatiList).hasSize(databaseSizeBeforeUpdate);
        AlteActivitati testAlteActivitati = alteActivitatiList.get(alteActivitatiList.size() - 1);
        assertThat(testAlteActivitati.getCodCAEN()).isEqualTo(UPDATED_COD_CAEN);
        assertThat(testAlteActivitati.getDenumirea()).isEqualTo(UPDATED_DENUMIREA);
    }

    @Test
    @Transactional
    void patchNonExistingAlteActivitati() throws Exception {
        int databaseSizeBeforeUpdate = alteActivitatiRepository.findAll().size();
        alteActivitati.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlteActivitatiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, alteActivitati.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(alteActivitati))
            )
            .andExpect(status().isBadRequest());

        // Validate the AlteActivitati in the database
        List<AlteActivitati> alteActivitatiList = alteActivitatiRepository.findAll();
        assertThat(alteActivitatiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAlteActivitati() throws Exception {
        int databaseSizeBeforeUpdate = alteActivitatiRepository.findAll().size();
        alteActivitati.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAlteActivitatiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(alteActivitati))
            )
            .andExpect(status().isBadRequest());

        // Validate the AlteActivitati in the database
        List<AlteActivitati> alteActivitatiList = alteActivitatiRepository.findAll();
        assertThat(alteActivitatiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAlteActivitati() throws Exception {
        int databaseSizeBeforeUpdate = alteActivitatiRepository.findAll().size();
        alteActivitati.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAlteActivitatiMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(alteActivitati))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AlteActivitati in the database
        List<AlteActivitati> alteActivitatiList = alteActivitatiRepository.findAll();
        assertThat(alteActivitatiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAlteActivitati() throws Exception {
        // Initialize the database
        alteActivitatiRepository.saveAndFlush(alteActivitati);

        int databaseSizeBeforeDelete = alteActivitatiRepository.findAll().size();

        // Delete the alteActivitati
        restAlteActivitatiMockMvc
            .perform(delete(ENTITY_API_URL_ID, alteActivitati.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AlteActivitati> alteActivitatiList = alteActivitatiRepository.findAll();
        assertThat(alteActivitatiList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
