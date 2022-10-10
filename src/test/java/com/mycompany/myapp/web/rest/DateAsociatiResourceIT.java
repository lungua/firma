package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.DateAsociati;
import com.mycompany.myapp.repository.DateAsociatiRepository;
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
 * Integration tests for the {@link DateAsociatiResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DateAsociatiResourceIT {

    private static final String DEFAULT_NUME = "AAAAAAAAAA";
    private static final String UPDATED_NUME = "BBBBBBBBBB";

    private static final String DEFAULT_PRENUME = "AAAAAAAAAA";
    private static final String UPDATED_PRENUME = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFON = "AAAAAAAAAA";
    private static final String UPDATED_TELEFON = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/date-asociatis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DateAsociatiRepository dateAsociatiRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDateAsociatiMockMvc;

    private DateAsociati dateAsociati;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DateAsociati createEntity(EntityManager em) {
        DateAsociati dateAsociati = new DateAsociati().nume(DEFAULT_NUME).prenume(DEFAULT_PRENUME).telefon(DEFAULT_TELEFON);
        return dateAsociati;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DateAsociati createUpdatedEntity(EntityManager em) {
        DateAsociati dateAsociati = new DateAsociati().nume(UPDATED_NUME).prenume(UPDATED_PRENUME).telefon(UPDATED_TELEFON);
        return dateAsociati;
    }

    @BeforeEach
    public void initTest() {
        dateAsociati = createEntity(em);
    }

    @Test
    @Transactional
    void createDateAsociati() throws Exception {
        int databaseSizeBeforeCreate = dateAsociatiRepository.findAll().size();
        // Create the DateAsociati
        restDateAsociatiMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dateAsociati)))
            .andExpect(status().isCreated());

        // Validate the DateAsociati in the database
        List<DateAsociati> dateAsociatiList = dateAsociatiRepository.findAll();
        assertThat(dateAsociatiList).hasSize(databaseSizeBeforeCreate + 1);
        DateAsociati testDateAsociati = dateAsociatiList.get(dateAsociatiList.size() - 1);
        assertThat(testDateAsociati.getNume()).isEqualTo(DEFAULT_NUME);
        assertThat(testDateAsociati.getPrenume()).isEqualTo(DEFAULT_PRENUME);
        assertThat(testDateAsociati.getTelefon()).isEqualTo(DEFAULT_TELEFON);
    }

    @Test
    @Transactional
    void createDateAsociatiWithExistingId() throws Exception {
        // Create the DateAsociati with an existing ID
        dateAsociati.setId(1L);

        int databaseSizeBeforeCreate = dateAsociatiRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDateAsociatiMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dateAsociati)))
            .andExpect(status().isBadRequest());

        // Validate the DateAsociati in the database
        List<DateAsociati> dateAsociatiList = dateAsociatiRepository.findAll();
        assertThat(dateAsociatiList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDateAsociatis() throws Exception {
        // Initialize the database
        dateAsociatiRepository.saveAndFlush(dateAsociati);

        // Get all the dateAsociatiList
        restDateAsociatiMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dateAsociati.getId().intValue())))
            .andExpect(jsonPath("$.[*].nume").value(hasItem(DEFAULT_NUME)))
            .andExpect(jsonPath("$.[*].prenume").value(hasItem(DEFAULT_PRENUME)))
            .andExpect(jsonPath("$.[*].telefon").value(hasItem(DEFAULT_TELEFON)));
    }

    @Test
    @Transactional
    void getDateAsociati() throws Exception {
        // Initialize the database
        dateAsociatiRepository.saveAndFlush(dateAsociati);

        // Get the dateAsociati
        restDateAsociatiMockMvc
            .perform(get(ENTITY_API_URL_ID, dateAsociati.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dateAsociati.getId().intValue()))
            .andExpect(jsonPath("$.nume").value(DEFAULT_NUME))
            .andExpect(jsonPath("$.prenume").value(DEFAULT_PRENUME))
            .andExpect(jsonPath("$.telefon").value(DEFAULT_TELEFON));
    }

    @Test
    @Transactional
    void getNonExistingDateAsociati() throws Exception {
        // Get the dateAsociati
        restDateAsociatiMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDateAsociati() throws Exception {
        // Initialize the database
        dateAsociatiRepository.saveAndFlush(dateAsociati);

        int databaseSizeBeforeUpdate = dateAsociatiRepository.findAll().size();

        // Update the dateAsociati
        DateAsociati updatedDateAsociati = dateAsociatiRepository.findById(dateAsociati.getId()).get();
        // Disconnect from session so that the updates on updatedDateAsociati are not directly saved in db
        em.detach(updatedDateAsociati);
        updatedDateAsociati.nume(UPDATED_NUME).prenume(UPDATED_PRENUME).telefon(UPDATED_TELEFON);

        restDateAsociatiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDateAsociati.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDateAsociati))
            )
            .andExpect(status().isOk());

        // Validate the DateAsociati in the database
        List<DateAsociati> dateAsociatiList = dateAsociatiRepository.findAll();
        assertThat(dateAsociatiList).hasSize(databaseSizeBeforeUpdate);
        DateAsociati testDateAsociati = dateAsociatiList.get(dateAsociatiList.size() - 1);
        assertThat(testDateAsociati.getNume()).isEqualTo(UPDATED_NUME);
        assertThat(testDateAsociati.getPrenume()).isEqualTo(UPDATED_PRENUME);
        assertThat(testDateAsociati.getTelefon()).isEqualTo(UPDATED_TELEFON);
    }

    @Test
    @Transactional
    void putNonExistingDateAsociati() throws Exception {
        int databaseSizeBeforeUpdate = dateAsociatiRepository.findAll().size();
        dateAsociati.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDateAsociatiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dateAsociati.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dateAsociati))
            )
            .andExpect(status().isBadRequest());

        // Validate the DateAsociati in the database
        List<DateAsociati> dateAsociatiList = dateAsociatiRepository.findAll();
        assertThat(dateAsociatiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDateAsociati() throws Exception {
        int databaseSizeBeforeUpdate = dateAsociatiRepository.findAll().size();
        dateAsociati.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDateAsociatiMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dateAsociati))
            )
            .andExpect(status().isBadRequest());

        // Validate the DateAsociati in the database
        List<DateAsociati> dateAsociatiList = dateAsociatiRepository.findAll();
        assertThat(dateAsociatiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDateAsociati() throws Exception {
        int databaseSizeBeforeUpdate = dateAsociatiRepository.findAll().size();
        dateAsociati.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDateAsociatiMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dateAsociati)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DateAsociati in the database
        List<DateAsociati> dateAsociatiList = dateAsociatiRepository.findAll();
        assertThat(dateAsociatiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDateAsociatiWithPatch() throws Exception {
        // Initialize the database
        dateAsociatiRepository.saveAndFlush(dateAsociati);

        int databaseSizeBeforeUpdate = dateAsociatiRepository.findAll().size();

        // Update the dateAsociati using partial update
        DateAsociati partialUpdatedDateAsociati = new DateAsociati();
        partialUpdatedDateAsociati.setId(dateAsociati.getId());

        partialUpdatedDateAsociati.nume(UPDATED_NUME);

        restDateAsociatiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDateAsociati.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDateAsociati))
            )
            .andExpect(status().isOk());

        // Validate the DateAsociati in the database
        List<DateAsociati> dateAsociatiList = dateAsociatiRepository.findAll();
        assertThat(dateAsociatiList).hasSize(databaseSizeBeforeUpdate);
        DateAsociati testDateAsociati = dateAsociatiList.get(dateAsociatiList.size() - 1);
        assertThat(testDateAsociati.getNume()).isEqualTo(UPDATED_NUME);
        assertThat(testDateAsociati.getPrenume()).isEqualTo(DEFAULT_PRENUME);
        assertThat(testDateAsociati.getTelefon()).isEqualTo(DEFAULT_TELEFON);
    }

    @Test
    @Transactional
    void fullUpdateDateAsociatiWithPatch() throws Exception {
        // Initialize the database
        dateAsociatiRepository.saveAndFlush(dateAsociati);

        int databaseSizeBeforeUpdate = dateAsociatiRepository.findAll().size();

        // Update the dateAsociati using partial update
        DateAsociati partialUpdatedDateAsociati = new DateAsociati();
        partialUpdatedDateAsociati.setId(dateAsociati.getId());

        partialUpdatedDateAsociati.nume(UPDATED_NUME).prenume(UPDATED_PRENUME).telefon(UPDATED_TELEFON);

        restDateAsociatiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDateAsociati.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDateAsociati))
            )
            .andExpect(status().isOk());

        // Validate the DateAsociati in the database
        List<DateAsociati> dateAsociatiList = dateAsociatiRepository.findAll();
        assertThat(dateAsociatiList).hasSize(databaseSizeBeforeUpdate);
        DateAsociati testDateAsociati = dateAsociatiList.get(dateAsociatiList.size() - 1);
        assertThat(testDateAsociati.getNume()).isEqualTo(UPDATED_NUME);
        assertThat(testDateAsociati.getPrenume()).isEqualTo(UPDATED_PRENUME);
        assertThat(testDateAsociati.getTelefon()).isEqualTo(UPDATED_TELEFON);
    }

    @Test
    @Transactional
    void patchNonExistingDateAsociati() throws Exception {
        int databaseSizeBeforeUpdate = dateAsociatiRepository.findAll().size();
        dateAsociati.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDateAsociatiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dateAsociati.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dateAsociati))
            )
            .andExpect(status().isBadRequest());

        // Validate the DateAsociati in the database
        List<DateAsociati> dateAsociatiList = dateAsociatiRepository.findAll();
        assertThat(dateAsociatiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDateAsociati() throws Exception {
        int databaseSizeBeforeUpdate = dateAsociatiRepository.findAll().size();
        dateAsociati.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDateAsociatiMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dateAsociati))
            )
            .andExpect(status().isBadRequest());

        // Validate the DateAsociati in the database
        List<DateAsociati> dateAsociatiList = dateAsociatiRepository.findAll();
        assertThat(dateAsociatiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDateAsociati() throws Exception {
        int databaseSizeBeforeUpdate = dateAsociatiRepository.findAll().size();
        dateAsociati.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDateAsociatiMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(dateAsociati))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DateAsociati in the database
        List<DateAsociati> dateAsociatiList = dateAsociatiRepository.findAll();
        assertThat(dateAsociatiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDateAsociati() throws Exception {
        // Initialize the database
        dateAsociatiRepository.saveAndFlush(dateAsociati);

        int databaseSizeBeforeDelete = dateAsociatiRepository.findAll().size();

        // Delete the dateAsociati
        restDateAsociatiMockMvc
            .perform(delete(ENTITY_API_URL_ID, dateAsociati.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DateAsociati> dateAsociatiList = dateAsociatiRepository.findAll();
        assertThat(dateAsociatiList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
