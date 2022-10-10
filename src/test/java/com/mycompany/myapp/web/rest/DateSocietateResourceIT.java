package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.DateSocietate;
import com.mycompany.myapp.repository.DateSocietateRepository;
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
 * Integration tests for the {@link DateSocietateResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DateSocietateResourceIT {

    private static final String DEFAULT_DENUMIRE = "AAAAAAAAAA";
    private static final String UPDATED_DENUMIRE = "BBBBBBBBBB";

    private static final String DEFAULT_CUI = "AAAAAAAAAA";
    private static final String UPDATED_CUI = "BBBBBBBBBB";

    private static final String DEFAULT_REG_COMERT = "AAAAAAAAAA";
    private static final String UPDATED_REG_COMERT = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESA_SEDIU = "AAAAAAAAAA";
    private static final String UPDATED_ADRESA_SEDIU = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/date-societates";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DateSocietateRepository dateSocietateRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDateSocietateMockMvc;

    private DateSocietate dateSocietate;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DateSocietate createEntity(EntityManager em) {
        DateSocietate dateSocietate = new DateSocietate()
            .denumire(DEFAULT_DENUMIRE)
            .cui(DEFAULT_CUI)
            .regComert(DEFAULT_REG_COMERT)
            .adresaSediu(DEFAULT_ADRESA_SEDIU);
        return dateSocietate;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DateSocietate createUpdatedEntity(EntityManager em) {
        DateSocietate dateSocietate = new DateSocietate()
            .denumire(UPDATED_DENUMIRE)
            .cui(UPDATED_CUI)
            .regComert(UPDATED_REG_COMERT)
            .adresaSediu(UPDATED_ADRESA_SEDIU);
        return dateSocietate;
    }

    @BeforeEach
    public void initTest() {
        dateSocietate = createEntity(em);
    }

    @Test
    @Transactional
    void createDateSocietate() throws Exception {
        int databaseSizeBeforeCreate = dateSocietateRepository.findAll().size();
        // Create the DateSocietate
        restDateSocietateMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dateSocietate)))
            .andExpect(status().isCreated());

        // Validate the DateSocietate in the database
        List<DateSocietate> dateSocietateList = dateSocietateRepository.findAll();
        assertThat(dateSocietateList).hasSize(databaseSizeBeforeCreate + 1);
        DateSocietate testDateSocietate = dateSocietateList.get(dateSocietateList.size() - 1);
        assertThat(testDateSocietate.getDenumire()).isEqualTo(DEFAULT_DENUMIRE);
        assertThat(testDateSocietate.getCui()).isEqualTo(DEFAULT_CUI);
        assertThat(testDateSocietate.getRegComert()).isEqualTo(DEFAULT_REG_COMERT);
        assertThat(testDateSocietate.getAdresaSediu()).isEqualTo(DEFAULT_ADRESA_SEDIU);
    }

    @Test
    @Transactional
    void createDateSocietateWithExistingId() throws Exception {
        // Create the DateSocietate with an existing ID
        dateSocietate.setId(1L);

        int databaseSizeBeforeCreate = dateSocietateRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDateSocietateMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dateSocietate)))
            .andExpect(status().isBadRequest());

        // Validate the DateSocietate in the database
        List<DateSocietate> dateSocietateList = dateSocietateRepository.findAll();
        assertThat(dateSocietateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDateSocietates() throws Exception {
        // Initialize the database
        dateSocietateRepository.saveAndFlush(dateSocietate);

        // Get all the dateSocietateList
        restDateSocietateMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dateSocietate.getId().intValue())))
            .andExpect(jsonPath("$.[*].denumire").value(hasItem(DEFAULT_DENUMIRE)))
            .andExpect(jsonPath("$.[*].cui").value(hasItem(DEFAULT_CUI)))
            .andExpect(jsonPath("$.[*].regComert").value(hasItem(DEFAULT_REG_COMERT)))
            .andExpect(jsonPath("$.[*].adresaSediu").value(hasItem(DEFAULT_ADRESA_SEDIU)));
    }

    @Test
    @Transactional
    void getDateSocietate() throws Exception {
        // Initialize the database
        dateSocietateRepository.saveAndFlush(dateSocietate);

        // Get the dateSocietate
        restDateSocietateMockMvc
            .perform(get(ENTITY_API_URL_ID, dateSocietate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dateSocietate.getId().intValue()))
            .andExpect(jsonPath("$.denumire").value(DEFAULT_DENUMIRE))
            .andExpect(jsonPath("$.cui").value(DEFAULT_CUI))
            .andExpect(jsonPath("$.regComert").value(DEFAULT_REG_COMERT))
            .andExpect(jsonPath("$.adresaSediu").value(DEFAULT_ADRESA_SEDIU));
    }

    @Test
    @Transactional
    void getNonExistingDateSocietate() throws Exception {
        // Get the dateSocietate
        restDateSocietateMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDateSocietate() throws Exception {
        // Initialize the database
        dateSocietateRepository.saveAndFlush(dateSocietate);

        int databaseSizeBeforeUpdate = dateSocietateRepository.findAll().size();

        // Update the dateSocietate
        DateSocietate updatedDateSocietate = dateSocietateRepository.findById(dateSocietate.getId()).get();
        // Disconnect from session so that the updates on updatedDateSocietate are not directly saved in db
        em.detach(updatedDateSocietate);
        updatedDateSocietate.denumire(UPDATED_DENUMIRE).cui(UPDATED_CUI).regComert(UPDATED_REG_COMERT).adresaSediu(UPDATED_ADRESA_SEDIU);

        restDateSocietateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDateSocietate.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDateSocietate))
            )
            .andExpect(status().isOk());

        // Validate the DateSocietate in the database
        List<DateSocietate> dateSocietateList = dateSocietateRepository.findAll();
        assertThat(dateSocietateList).hasSize(databaseSizeBeforeUpdate);
        DateSocietate testDateSocietate = dateSocietateList.get(dateSocietateList.size() - 1);
        assertThat(testDateSocietate.getDenumire()).isEqualTo(UPDATED_DENUMIRE);
        assertThat(testDateSocietate.getCui()).isEqualTo(UPDATED_CUI);
        assertThat(testDateSocietate.getRegComert()).isEqualTo(UPDATED_REG_COMERT);
        assertThat(testDateSocietate.getAdresaSediu()).isEqualTo(UPDATED_ADRESA_SEDIU);
    }

    @Test
    @Transactional
    void putNonExistingDateSocietate() throws Exception {
        int databaseSizeBeforeUpdate = dateSocietateRepository.findAll().size();
        dateSocietate.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDateSocietateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dateSocietate.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dateSocietate))
            )
            .andExpect(status().isBadRequest());

        // Validate the DateSocietate in the database
        List<DateSocietate> dateSocietateList = dateSocietateRepository.findAll();
        assertThat(dateSocietateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDateSocietate() throws Exception {
        int databaseSizeBeforeUpdate = dateSocietateRepository.findAll().size();
        dateSocietate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDateSocietateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dateSocietate))
            )
            .andExpect(status().isBadRequest());

        // Validate the DateSocietate in the database
        List<DateSocietate> dateSocietateList = dateSocietateRepository.findAll();
        assertThat(dateSocietateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDateSocietate() throws Exception {
        int databaseSizeBeforeUpdate = dateSocietateRepository.findAll().size();
        dateSocietate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDateSocietateMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dateSocietate)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DateSocietate in the database
        List<DateSocietate> dateSocietateList = dateSocietateRepository.findAll();
        assertThat(dateSocietateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDateSocietateWithPatch() throws Exception {
        // Initialize the database
        dateSocietateRepository.saveAndFlush(dateSocietate);

        int databaseSizeBeforeUpdate = dateSocietateRepository.findAll().size();

        // Update the dateSocietate using partial update
        DateSocietate partialUpdatedDateSocietate = new DateSocietate();
        partialUpdatedDateSocietate.setId(dateSocietate.getId());

        partialUpdatedDateSocietate
            .denumire(UPDATED_DENUMIRE)
            .cui(UPDATED_CUI)
            .regComert(UPDATED_REG_COMERT)
            .adresaSediu(UPDATED_ADRESA_SEDIU);

        restDateSocietateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDateSocietate.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDateSocietate))
            )
            .andExpect(status().isOk());

        // Validate the DateSocietate in the database
        List<DateSocietate> dateSocietateList = dateSocietateRepository.findAll();
        assertThat(dateSocietateList).hasSize(databaseSizeBeforeUpdate);
        DateSocietate testDateSocietate = dateSocietateList.get(dateSocietateList.size() - 1);
        assertThat(testDateSocietate.getDenumire()).isEqualTo(UPDATED_DENUMIRE);
        assertThat(testDateSocietate.getCui()).isEqualTo(UPDATED_CUI);
        assertThat(testDateSocietate.getRegComert()).isEqualTo(UPDATED_REG_COMERT);
        assertThat(testDateSocietate.getAdresaSediu()).isEqualTo(UPDATED_ADRESA_SEDIU);
    }

    @Test
    @Transactional
    void fullUpdateDateSocietateWithPatch() throws Exception {
        // Initialize the database
        dateSocietateRepository.saveAndFlush(dateSocietate);

        int databaseSizeBeforeUpdate = dateSocietateRepository.findAll().size();

        // Update the dateSocietate using partial update
        DateSocietate partialUpdatedDateSocietate = new DateSocietate();
        partialUpdatedDateSocietate.setId(dateSocietate.getId());

        partialUpdatedDateSocietate
            .denumire(UPDATED_DENUMIRE)
            .cui(UPDATED_CUI)
            .regComert(UPDATED_REG_COMERT)
            .adresaSediu(UPDATED_ADRESA_SEDIU);

        restDateSocietateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDateSocietate.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDateSocietate))
            )
            .andExpect(status().isOk());

        // Validate the DateSocietate in the database
        List<DateSocietate> dateSocietateList = dateSocietateRepository.findAll();
        assertThat(dateSocietateList).hasSize(databaseSizeBeforeUpdate);
        DateSocietate testDateSocietate = dateSocietateList.get(dateSocietateList.size() - 1);
        assertThat(testDateSocietate.getDenumire()).isEqualTo(UPDATED_DENUMIRE);
        assertThat(testDateSocietate.getCui()).isEqualTo(UPDATED_CUI);
        assertThat(testDateSocietate.getRegComert()).isEqualTo(UPDATED_REG_COMERT);
        assertThat(testDateSocietate.getAdresaSediu()).isEqualTo(UPDATED_ADRESA_SEDIU);
    }

    @Test
    @Transactional
    void patchNonExistingDateSocietate() throws Exception {
        int databaseSizeBeforeUpdate = dateSocietateRepository.findAll().size();
        dateSocietate.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDateSocietateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dateSocietate.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dateSocietate))
            )
            .andExpect(status().isBadRequest());

        // Validate the DateSocietate in the database
        List<DateSocietate> dateSocietateList = dateSocietateRepository.findAll();
        assertThat(dateSocietateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDateSocietate() throws Exception {
        int databaseSizeBeforeUpdate = dateSocietateRepository.findAll().size();
        dateSocietate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDateSocietateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dateSocietate))
            )
            .andExpect(status().isBadRequest());

        // Validate the DateSocietate in the database
        List<DateSocietate> dateSocietateList = dateSocietateRepository.findAll();
        assertThat(dateSocietateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDateSocietate() throws Exception {
        int databaseSizeBeforeUpdate = dateSocietateRepository.findAll().size();
        dateSocietate.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDateSocietateMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(dateSocietate))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DateSocietate in the database
        List<DateSocietate> dateSocietateList = dateSocietateRepository.findAll();
        assertThat(dateSocietateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDateSocietate() throws Exception {
        // Initialize the database
        dateSocietateRepository.saveAndFlush(dateSocietate);

        int databaseSizeBeforeDelete = dateSocietateRepository.findAll().size();

        // Delete the dateSocietate
        restDateSocietateMockMvc
            .perform(delete(ENTITY_API_URL_ID, dateSocietate.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DateSocietate> dateSocietateList = dateSocietateRepository.findAll();
        assertThat(dateSocietateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
