package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.AsocAdmin;
import com.mycompany.myapp.repository.AsocAdminRepository;
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
 * Integration tests for the {@link AsocAdminResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AsocAdminResourceIT {

    private static final Boolean DEFAULT_PERSOANA_FIZICA = false;
    private static final Boolean UPDATED_PERSOANA_FIZICA = true;

    private static final Boolean DEFAULT_ASOCIAT = false;
    private static final Boolean UPDATED_ASOCIAT = true;

    private static final String ENTITY_API_URL = "/api/asoc-admins";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AsocAdminRepository asocAdminRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAsocAdminMockMvc;

    private AsocAdmin asocAdmin;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AsocAdmin createEntity(EntityManager em) {
        AsocAdmin asocAdmin = new AsocAdmin().persoanaFizica(DEFAULT_PERSOANA_FIZICA).asociat(DEFAULT_ASOCIAT);
        return asocAdmin;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AsocAdmin createUpdatedEntity(EntityManager em) {
        AsocAdmin asocAdmin = new AsocAdmin().persoanaFizica(UPDATED_PERSOANA_FIZICA).asociat(UPDATED_ASOCIAT);
        return asocAdmin;
    }

    @BeforeEach
    public void initTest() {
        asocAdmin = createEntity(em);
    }

    @Test
    @Transactional
    void createAsocAdmin() throws Exception {
        int databaseSizeBeforeCreate = asocAdminRepository.findAll().size();
        // Create the AsocAdmin
        restAsocAdminMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(asocAdmin)))
            .andExpect(status().isCreated());

        // Validate the AsocAdmin in the database
        List<AsocAdmin> asocAdminList = asocAdminRepository.findAll();
        assertThat(asocAdminList).hasSize(databaseSizeBeforeCreate + 1);
        AsocAdmin testAsocAdmin = asocAdminList.get(asocAdminList.size() - 1);
        assertThat(testAsocAdmin.getPersoanaFizica()).isEqualTo(DEFAULT_PERSOANA_FIZICA);
        assertThat(testAsocAdmin.getAsociat()).isEqualTo(DEFAULT_ASOCIAT);
    }

    @Test
    @Transactional
    void createAsocAdminWithExistingId() throws Exception {
        // Create the AsocAdmin with an existing ID
        asocAdmin.setId(1L);

        int databaseSizeBeforeCreate = asocAdminRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsocAdminMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(asocAdmin)))
            .andExpect(status().isBadRequest());

        // Validate the AsocAdmin in the database
        List<AsocAdmin> asocAdminList = asocAdminRepository.findAll();
        assertThat(asocAdminList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAsocAdmins() throws Exception {
        // Initialize the database
        asocAdminRepository.saveAndFlush(asocAdmin);

        // Get all the asocAdminList
        restAsocAdminMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asocAdmin.getId().intValue())))
            .andExpect(jsonPath("$.[*].persoanaFizica").value(hasItem(DEFAULT_PERSOANA_FIZICA.booleanValue())))
            .andExpect(jsonPath("$.[*].asociat").value(hasItem(DEFAULT_ASOCIAT.booleanValue())));
    }

    @Test
    @Transactional
    void getAsocAdmin() throws Exception {
        // Initialize the database
        asocAdminRepository.saveAndFlush(asocAdmin);

        // Get the asocAdmin
        restAsocAdminMockMvc
            .perform(get(ENTITY_API_URL_ID, asocAdmin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(asocAdmin.getId().intValue()))
            .andExpect(jsonPath("$.persoanaFizica").value(DEFAULT_PERSOANA_FIZICA.booleanValue()))
            .andExpect(jsonPath("$.asociat").value(DEFAULT_ASOCIAT.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingAsocAdmin() throws Exception {
        // Get the asocAdmin
        restAsocAdminMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAsocAdmin() throws Exception {
        // Initialize the database
        asocAdminRepository.saveAndFlush(asocAdmin);

        int databaseSizeBeforeUpdate = asocAdminRepository.findAll().size();

        // Update the asocAdmin
        AsocAdmin updatedAsocAdmin = asocAdminRepository.findById(asocAdmin.getId()).get();
        // Disconnect from session so that the updates on updatedAsocAdmin are not directly saved in db
        em.detach(updatedAsocAdmin);
        updatedAsocAdmin.persoanaFizica(UPDATED_PERSOANA_FIZICA).asociat(UPDATED_ASOCIAT);

        restAsocAdminMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAsocAdmin.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAsocAdmin))
            )
            .andExpect(status().isOk());

        // Validate the AsocAdmin in the database
        List<AsocAdmin> asocAdminList = asocAdminRepository.findAll();
        assertThat(asocAdminList).hasSize(databaseSizeBeforeUpdate);
        AsocAdmin testAsocAdmin = asocAdminList.get(asocAdminList.size() - 1);
        assertThat(testAsocAdmin.getPersoanaFizica()).isEqualTo(UPDATED_PERSOANA_FIZICA);
        assertThat(testAsocAdmin.getAsociat()).isEqualTo(UPDATED_ASOCIAT);
    }

    @Test
    @Transactional
    void putNonExistingAsocAdmin() throws Exception {
        int databaseSizeBeforeUpdate = asocAdminRepository.findAll().size();
        asocAdmin.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAsocAdminMockMvc
            .perform(
                put(ENTITY_API_URL_ID, asocAdmin.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(asocAdmin))
            )
            .andExpect(status().isBadRequest());

        // Validate the AsocAdmin in the database
        List<AsocAdmin> asocAdminList = asocAdminRepository.findAll();
        assertThat(asocAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAsocAdmin() throws Exception {
        int databaseSizeBeforeUpdate = asocAdminRepository.findAll().size();
        asocAdmin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAsocAdminMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(asocAdmin))
            )
            .andExpect(status().isBadRequest());

        // Validate the AsocAdmin in the database
        List<AsocAdmin> asocAdminList = asocAdminRepository.findAll();
        assertThat(asocAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAsocAdmin() throws Exception {
        int databaseSizeBeforeUpdate = asocAdminRepository.findAll().size();
        asocAdmin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAsocAdminMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(asocAdmin)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AsocAdmin in the database
        List<AsocAdmin> asocAdminList = asocAdminRepository.findAll();
        assertThat(asocAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAsocAdminWithPatch() throws Exception {
        // Initialize the database
        asocAdminRepository.saveAndFlush(asocAdmin);

        int databaseSizeBeforeUpdate = asocAdminRepository.findAll().size();

        // Update the asocAdmin using partial update
        AsocAdmin partialUpdatedAsocAdmin = new AsocAdmin();
        partialUpdatedAsocAdmin.setId(asocAdmin.getId());

        restAsocAdminMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAsocAdmin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAsocAdmin))
            )
            .andExpect(status().isOk());

        // Validate the AsocAdmin in the database
        List<AsocAdmin> asocAdminList = asocAdminRepository.findAll();
        assertThat(asocAdminList).hasSize(databaseSizeBeforeUpdate);
        AsocAdmin testAsocAdmin = asocAdminList.get(asocAdminList.size() - 1);
        assertThat(testAsocAdmin.getPersoanaFizica()).isEqualTo(DEFAULT_PERSOANA_FIZICA);
        assertThat(testAsocAdmin.getAsociat()).isEqualTo(DEFAULT_ASOCIAT);
    }

    @Test
    @Transactional
    void fullUpdateAsocAdminWithPatch() throws Exception {
        // Initialize the database
        asocAdminRepository.saveAndFlush(asocAdmin);

        int databaseSizeBeforeUpdate = asocAdminRepository.findAll().size();

        // Update the asocAdmin using partial update
        AsocAdmin partialUpdatedAsocAdmin = new AsocAdmin();
        partialUpdatedAsocAdmin.setId(asocAdmin.getId());

        partialUpdatedAsocAdmin.persoanaFizica(UPDATED_PERSOANA_FIZICA).asociat(UPDATED_ASOCIAT);

        restAsocAdminMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAsocAdmin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAsocAdmin))
            )
            .andExpect(status().isOk());

        // Validate the AsocAdmin in the database
        List<AsocAdmin> asocAdminList = asocAdminRepository.findAll();
        assertThat(asocAdminList).hasSize(databaseSizeBeforeUpdate);
        AsocAdmin testAsocAdmin = asocAdminList.get(asocAdminList.size() - 1);
        assertThat(testAsocAdmin.getPersoanaFizica()).isEqualTo(UPDATED_PERSOANA_FIZICA);
        assertThat(testAsocAdmin.getAsociat()).isEqualTo(UPDATED_ASOCIAT);
    }

    @Test
    @Transactional
    void patchNonExistingAsocAdmin() throws Exception {
        int databaseSizeBeforeUpdate = asocAdminRepository.findAll().size();
        asocAdmin.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAsocAdminMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, asocAdmin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(asocAdmin))
            )
            .andExpect(status().isBadRequest());

        // Validate the AsocAdmin in the database
        List<AsocAdmin> asocAdminList = asocAdminRepository.findAll();
        assertThat(asocAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAsocAdmin() throws Exception {
        int databaseSizeBeforeUpdate = asocAdminRepository.findAll().size();
        asocAdmin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAsocAdminMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(asocAdmin))
            )
            .andExpect(status().isBadRequest());

        // Validate the AsocAdmin in the database
        List<AsocAdmin> asocAdminList = asocAdminRepository.findAll();
        assertThat(asocAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAsocAdmin() throws Exception {
        int databaseSizeBeforeUpdate = asocAdminRepository.findAll().size();
        asocAdmin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAsocAdminMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(asocAdmin))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AsocAdmin in the database
        List<AsocAdmin> asocAdminList = asocAdminRepository.findAll();
        assertThat(asocAdminList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAsocAdmin() throws Exception {
        // Initialize the database
        asocAdminRepository.saveAndFlush(asocAdmin);

        int databaseSizeBeforeDelete = asocAdminRepository.findAll().size();

        // Delete the asocAdmin
        restAsocAdminMockMvc
            .perform(delete(ENTITY_API_URL_ID, asocAdmin.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AsocAdmin> asocAdminList = asocAdminRepository.findAll();
        assertThat(asocAdminList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
