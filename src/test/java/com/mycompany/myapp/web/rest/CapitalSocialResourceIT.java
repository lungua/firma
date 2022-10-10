package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.CapitalSocial;
import com.mycompany.myapp.repository.CapitalSocialRepository;
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
 * Integration tests for the {@link CapitalSocialResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CapitalSocialResourceIT {

    private static final String DEFAULT_SUMA = "AAAAAAAAAA";
    private static final String UPDATED_SUMA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/capital-socials";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CapitalSocialRepository capitalSocialRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCapitalSocialMockMvc;

    private CapitalSocial capitalSocial;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CapitalSocial createEntity(EntityManager em) {
        CapitalSocial capitalSocial = new CapitalSocial().suma(DEFAULT_SUMA);
        return capitalSocial;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CapitalSocial createUpdatedEntity(EntityManager em) {
        CapitalSocial capitalSocial = new CapitalSocial().suma(UPDATED_SUMA);
        return capitalSocial;
    }

    @BeforeEach
    public void initTest() {
        capitalSocial = createEntity(em);
    }

    @Test
    @Transactional
    void createCapitalSocial() throws Exception {
        int databaseSizeBeforeCreate = capitalSocialRepository.findAll().size();
        // Create the CapitalSocial
        restCapitalSocialMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(capitalSocial)))
            .andExpect(status().isCreated());

        // Validate the CapitalSocial in the database
        List<CapitalSocial> capitalSocialList = capitalSocialRepository.findAll();
        assertThat(capitalSocialList).hasSize(databaseSizeBeforeCreate + 1);
        CapitalSocial testCapitalSocial = capitalSocialList.get(capitalSocialList.size() - 1);
        assertThat(testCapitalSocial.getSuma()).isEqualTo(DEFAULT_SUMA);
    }

    @Test
    @Transactional
    void createCapitalSocialWithExistingId() throws Exception {
        // Create the CapitalSocial with an existing ID
        capitalSocial.setId(1L);

        int databaseSizeBeforeCreate = capitalSocialRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCapitalSocialMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(capitalSocial)))
            .andExpect(status().isBadRequest());

        // Validate the CapitalSocial in the database
        List<CapitalSocial> capitalSocialList = capitalSocialRepository.findAll();
        assertThat(capitalSocialList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCapitalSocials() throws Exception {
        // Initialize the database
        capitalSocialRepository.saveAndFlush(capitalSocial);

        // Get all the capitalSocialList
        restCapitalSocialMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(capitalSocial.getId().intValue())))
            .andExpect(jsonPath("$.[*].suma").value(hasItem(DEFAULT_SUMA)));
    }

    @Test
    @Transactional
    void getCapitalSocial() throws Exception {
        // Initialize the database
        capitalSocialRepository.saveAndFlush(capitalSocial);

        // Get the capitalSocial
        restCapitalSocialMockMvc
            .perform(get(ENTITY_API_URL_ID, capitalSocial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(capitalSocial.getId().intValue()))
            .andExpect(jsonPath("$.suma").value(DEFAULT_SUMA));
    }

    @Test
    @Transactional
    void getNonExistingCapitalSocial() throws Exception {
        // Get the capitalSocial
        restCapitalSocialMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCapitalSocial() throws Exception {
        // Initialize the database
        capitalSocialRepository.saveAndFlush(capitalSocial);

        int databaseSizeBeforeUpdate = capitalSocialRepository.findAll().size();

        // Update the capitalSocial
        CapitalSocial updatedCapitalSocial = capitalSocialRepository.findById(capitalSocial.getId()).get();
        // Disconnect from session so that the updates on updatedCapitalSocial are not directly saved in db
        em.detach(updatedCapitalSocial);
        updatedCapitalSocial.suma(UPDATED_SUMA);

        restCapitalSocialMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCapitalSocial.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCapitalSocial))
            )
            .andExpect(status().isOk());

        // Validate the CapitalSocial in the database
        List<CapitalSocial> capitalSocialList = capitalSocialRepository.findAll();
        assertThat(capitalSocialList).hasSize(databaseSizeBeforeUpdate);
        CapitalSocial testCapitalSocial = capitalSocialList.get(capitalSocialList.size() - 1);
        assertThat(testCapitalSocial.getSuma()).isEqualTo(UPDATED_SUMA);
    }

    @Test
    @Transactional
    void putNonExistingCapitalSocial() throws Exception {
        int databaseSizeBeforeUpdate = capitalSocialRepository.findAll().size();
        capitalSocial.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCapitalSocialMockMvc
            .perform(
                put(ENTITY_API_URL_ID, capitalSocial.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(capitalSocial))
            )
            .andExpect(status().isBadRequest());

        // Validate the CapitalSocial in the database
        List<CapitalSocial> capitalSocialList = capitalSocialRepository.findAll();
        assertThat(capitalSocialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCapitalSocial() throws Exception {
        int databaseSizeBeforeUpdate = capitalSocialRepository.findAll().size();
        capitalSocial.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCapitalSocialMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(capitalSocial))
            )
            .andExpect(status().isBadRequest());

        // Validate the CapitalSocial in the database
        List<CapitalSocial> capitalSocialList = capitalSocialRepository.findAll();
        assertThat(capitalSocialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCapitalSocial() throws Exception {
        int databaseSizeBeforeUpdate = capitalSocialRepository.findAll().size();
        capitalSocial.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCapitalSocialMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(capitalSocial)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CapitalSocial in the database
        List<CapitalSocial> capitalSocialList = capitalSocialRepository.findAll();
        assertThat(capitalSocialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCapitalSocialWithPatch() throws Exception {
        // Initialize the database
        capitalSocialRepository.saveAndFlush(capitalSocial);

        int databaseSizeBeforeUpdate = capitalSocialRepository.findAll().size();

        // Update the capitalSocial using partial update
        CapitalSocial partialUpdatedCapitalSocial = new CapitalSocial();
        partialUpdatedCapitalSocial.setId(capitalSocial.getId());

        restCapitalSocialMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCapitalSocial.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCapitalSocial))
            )
            .andExpect(status().isOk());

        // Validate the CapitalSocial in the database
        List<CapitalSocial> capitalSocialList = capitalSocialRepository.findAll();
        assertThat(capitalSocialList).hasSize(databaseSizeBeforeUpdate);
        CapitalSocial testCapitalSocial = capitalSocialList.get(capitalSocialList.size() - 1);
        assertThat(testCapitalSocial.getSuma()).isEqualTo(DEFAULT_SUMA);
    }

    @Test
    @Transactional
    void fullUpdateCapitalSocialWithPatch() throws Exception {
        // Initialize the database
        capitalSocialRepository.saveAndFlush(capitalSocial);

        int databaseSizeBeforeUpdate = capitalSocialRepository.findAll().size();

        // Update the capitalSocial using partial update
        CapitalSocial partialUpdatedCapitalSocial = new CapitalSocial();
        partialUpdatedCapitalSocial.setId(capitalSocial.getId());

        partialUpdatedCapitalSocial.suma(UPDATED_SUMA);

        restCapitalSocialMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCapitalSocial.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCapitalSocial))
            )
            .andExpect(status().isOk());

        // Validate the CapitalSocial in the database
        List<CapitalSocial> capitalSocialList = capitalSocialRepository.findAll();
        assertThat(capitalSocialList).hasSize(databaseSizeBeforeUpdate);
        CapitalSocial testCapitalSocial = capitalSocialList.get(capitalSocialList.size() - 1);
        assertThat(testCapitalSocial.getSuma()).isEqualTo(UPDATED_SUMA);
    }

    @Test
    @Transactional
    void patchNonExistingCapitalSocial() throws Exception {
        int databaseSizeBeforeUpdate = capitalSocialRepository.findAll().size();
        capitalSocial.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCapitalSocialMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, capitalSocial.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(capitalSocial))
            )
            .andExpect(status().isBadRequest());

        // Validate the CapitalSocial in the database
        List<CapitalSocial> capitalSocialList = capitalSocialRepository.findAll();
        assertThat(capitalSocialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCapitalSocial() throws Exception {
        int databaseSizeBeforeUpdate = capitalSocialRepository.findAll().size();
        capitalSocial.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCapitalSocialMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(capitalSocial))
            )
            .andExpect(status().isBadRequest());

        // Validate the CapitalSocial in the database
        List<CapitalSocial> capitalSocialList = capitalSocialRepository.findAll();
        assertThat(capitalSocialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCapitalSocial() throws Exception {
        int databaseSizeBeforeUpdate = capitalSocialRepository.findAll().size();
        capitalSocial.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCapitalSocialMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(capitalSocial))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CapitalSocial in the database
        List<CapitalSocial> capitalSocialList = capitalSocialRepository.findAll();
        assertThat(capitalSocialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCapitalSocial() throws Exception {
        // Initialize the database
        capitalSocialRepository.saveAndFlush(capitalSocial);

        int databaseSizeBeforeDelete = capitalSocialRepository.findAll().size();

        // Delete the capitalSocial
        restCapitalSocialMockMvc
            .perform(delete(ENTITY_API_URL_ID, capitalSocial.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CapitalSocial> capitalSocialList = capitalSocialRepository.findAll();
        assertThat(capitalSocialList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
