package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ActivitatiPrincipale;
import com.mycompany.myapp.repository.ActivitatiPrincipaleRepository;
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
 * Integration tests for the {@link ActivitatiPrincipaleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ActivitatiPrincipaleResourceIT {

    private static final String DEFAULT_COD_CAEN = "AAAAAAAAAA";
    private static final String UPDATED_COD_CAEN = "BBBBBBBBBB";

    private static final String DEFAULT_DENUMIREA = "AAAAAAAAAA";
    private static final String UPDATED_DENUMIREA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/activitati-principales";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ActivitatiPrincipaleRepository activitatiPrincipaleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restActivitatiPrincipaleMockMvc;

    private ActivitatiPrincipale activitatiPrincipale;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ActivitatiPrincipale createEntity(EntityManager em) {
        ActivitatiPrincipale activitatiPrincipale = new ActivitatiPrincipale().codCAEN(DEFAULT_COD_CAEN).denumirea(DEFAULT_DENUMIREA);
        return activitatiPrincipale;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ActivitatiPrincipale createUpdatedEntity(EntityManager em) {
        ActivitatiPrincipale activitatiPrincipale = new ActivitatiPrincipale().codCAEN(UPDATED_COD_CAEN).denumirea(UPDATED_DENUMIREA);
        return activitatiPrincipale;
    }

    @BeforeEach
    public void initTest() {
        activitatiPrincipale = createEntity(em);
    }

    @Test
    @Transactional
    void createActivitatiPrincipale() throws Exception {
        int databaseSizeBeforeCreate = activitatiPrincipaleRepository.findAll().size();
        // Create the ActivitatiPrincipale
        restActivitatiPrincipaleMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(activitatiPrincipale))
            )
            .andExpect(status().isCreated());

        // Validate the ActivitatiPrincipale in the database
        List<ActivitatiPrincipale> activitatiPrincipaleList = activitatiPrincipaleRepository.findAll();
        assertThat(activitatiPrincipaleList).hasSize(databaseSizeBeforeCreate + 1);
        ActivitatiPrincipale testActivitatiPrincipale = activitatiPrincipaleList.get(activitatiPrincipaleList.size() - 1);
        assertThat(testActivitatiPrincipale.getCodCAEN()).isEqualTo(DEFAULT_COD_CAEN);
        assertThat(testActivitatiPrincipale.getDenumirea()).isEqualTo(DEFAULT_DENUMIREA);
    }

    @Test
    @Transactional
    void createActivitatiPrincipaleWithExistingId() throws Exception {
        // Create the ActivitatiPrincipale with an existing ID
        activitatiPrincipale.setId(1L);

        int databaseSizeBeforeCreate = activitatiPrincipaleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restActivitatiPrincipaleMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(activitatiPrincipale))
            )
            .andExpect(status().isBadRequest());

        // Validate the ActivitatiPrincipale in the database
        List<ActivitatiPrincipale> activitatiPrincipaleList = activitatiPrincipaleRepository.findAll();
        assertThat(activitatiPrincipaleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllActivitatiPrincipales() throws Exception {
        // Initialize the database
        activitatiPrincipaleRepository.saveAndFlush(activitatiPrincipale);

        // Get all the activitatiPrincipaleList
        restActivitatiPrincipaleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(activitatiPrincipale.getId().intValue())))
            .andExpect(jsonPath("$.[*].codCAEN").value(hasItem(DEFAULT_COD_CAEN)))
            .andExpect(jsonPath("$.[*].denumirea").value(hasItem(DEFAULT_DENUMIREA)));
    }

    @Test
    @Transactional
    void getActivitatiPrincipale() throws Exception {
        // Initialize the database
        activitatiPrincipaleRepository.saveAndFlush(activitatiPrincipale);

        // Get the activitatiPrincipale
        restActivitatiPrincipaleMockMvc
            .perform(get(ENTITY_API_URL_ID, activitatiPrincipale.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(activitatiPrincipale.getId().intValue()))
            .andExpect(jsonPath("$.codCAEN").value(DEFAULT_COD_CAEN))
            .andExpect(jsonPath("$.denumirea").value(DEFAULT_DENUMIREA));
    }

    @Test
    @Transactional
    void getNonExistingActivitatiPrincipale() throws Exception {
        // Get the activitatiPrincipale
        restActivitatiPrincipaleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingActivitatiPrincipale() throws Exception {
        // Initialize the database
        activitatiPrincipaleRepository.saveAndFlush(activitatiPrincipale);

        int databaseSizeBeforeUpdate = activitatiPrincipaleRepository.findAll().size();

        // Update the activitatiPrincipale
        ActivitatiPrincipale updatedActivitatiPrincipale = activitatiPrincipaleRepository.findById(activitatiPrincipale.getId()).get();
        // Disconnect from session so that the updates on updatedActivitatiPrincipale are not directly saved in db
        em.detach(updatedActivitatiPrincipale);
        updatedActivitatiPrincipale.codCAEN(UPDATED_COD_CAEN).denumirea(UPDATED_DENUMIREA);

        restActivitatiPrincipaleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedActivitatiPrincipale.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedActivitatiPrincipale))
            )
            .andExpect(status().isOk());

        // Validate the ActivitatiPrincipale in the database
        List<ActivitatiPrincipale> activitatiPrincipaleList = activitatiPrincipaleRepository.findAll();
        assertThat(activitatiPrincipaleList).hasSize(databaseSizeBeforeUpdate);
        ActivitatiPrincipale testActivitatiPrincipale = activitatiPrincipaleList.get(activitatiPrincipaleList.size() - 1);
        assertThat(testActivitatiPrincipale.getCodCAEN()).isEqualTo(UPDATED_COD_CAEN);
        assertThat(testActivitatiPrincipale.getDenumirea()).isEqualTo(UPDATED_DENUMIREA);
    }

    @Test
    @Transactional
    void putNonExistingActivitatiPrincipale() throws Exception {
        int databaseSizeBeforeUpdate = activitatiPrincipaleRepository.findAll().size();
        activitatiPrincipale.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restActivitatiPrincipaleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, activitatiPrincipale.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(activitatiPrincipale))
            )
            .andExpect(status().isBadRequest());

        // Validate the ActivitatiPrincipale in the database
        List<ActivitatiPrincipale> activitatiPrincipaleList = activitatiPrincipaleRepository.findAll();
        assertThat(activitatiPrincipaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchActivitatiPrincipale() throws Exception {
        int databaseSizeBeforeUpdate = activitatiPrincipaleRepository.findAll().size();
        activitatiPrincipale.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restActivitatiPrincipaleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(activitatiPrincipale))
            )
            .andExpect(status().isBadRequest());

        // Validate the ActivitatiPrincipale in the database
        List<ActivitatiPrincipale> activitatiPrincipaleList = activitatiPrincipaleRepository.findAll();
        assertThat(activitatiPrincipaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamActivitatiPrincipale() throws Exception {
        int databaseSizeBeforeUpdate = activitatiPrincipaleRepository.findAll().size();
        activitatiPrincipale.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restActivitatiPrincipaleMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(activitatiPrincipale))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ActivitatiPrincipale in the database
        List<ActivitatiPrincipale> activitatiPrincipaleList = activitatiPrincipaleRepository.findAll();
        assertThat(activitatiPrincipaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateActivitatiPrincipaleWithPatch() throws Exception {
        // Initialize the database
        activitatiPrincipaleRepository.saveAndFlush(activitatiPrincipale);

        int databaseSizeBeforeUpdate = activitatiPrincipaleRepository.findAll().size();

        // Update the activitatiPrincipale using partial update
        ActivitatiPrincipale partialUpdatedActivitatiPrincipale = new ActivitatiPrincipale();
        partialUpdatedActivitatiPrincipale.setId(activitatiPrincipale.getId());

        partialUpdatedActivitatiPrincipale.codCAEN(UPDATED_COD_CAEN).denumirea(UPDATED_DENUMIREA);

        restActivitatiPrincipaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedActivitatiPrincipale.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedActivitatiPrincipale))
            )
            .andExpect(status().isOk());

        // Validate the ActivitatiPrincipale in the database
        List<ActivitatiPrincipale> activitatiPrincipaleList = activitatiPrincipaleRepository.findAll();
        assertThat(activitatiPrincipaleList).hasSize(databaseSizeBeforeUpdate);
        ActivitatiPrincipale testActivitatiPrincipale = activitatiPrincipaleList.get(activitatiPrincipaleList.size() - 1);
        assertThat(testActivitatiPrincipale.getCodCAEN()).isEqualTo(UPDATED_COD_CAEN);
        assertThat(testActivitatiPrincipale.getDenumirea()).isEqualTo(UPDATED_DENUMIREA);
    }

    @Test
    @Transactional
    void fullUpdateActivitatiPrincipaleWithPatch() throws Exception {
        // Initialize the database
        activitatiPrincipaleRepository.saveAndFlush(activitatiPrincipale);

        int databaseSizeBeforeUpdate = activitatiPrincipaleRepository.findAll().size();

        // Update the activitatiPrincipale using partial update
        ActivitatiPrincipale partialUpdatedActivitatiPrincipale = new ActivitatiPrincipale();
        partialUpdatedActivitatiPrincipale.setId(activitatiPrincipale.getId());

        partialUpdatedActivitatiPrincipale.codCAEN(UPDATED_COD_CAEN).denumirea(UPDATED_DENUMIREA);

        restActivitatiPrincipaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedActivitatiPrincipale.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedActivitatiPrincipale))
            )
            .andExpect(status().isOk());

        // Validate the ActivitatiPrincipale in the database
        List<ActivitatiPrincipale> activitatiPrincipaleList = activitatiPrincipaleRepository.findAll();
        assertThat(activitatiPrincipaleList).hasSize(databaseSizeBeforeUpdate);
        ActivitatiPrincipale testActivitatiPrincipale = activitatiPrincipaleList.get(activitatiPrincipaleList.size() - 1);
        assertThat(testActivitatiPrincipale.getCodCAEN()).isEqualTo(UPDATED_COD_CAEN);
        assertThat(testActivitatiPrincipale.getDenumirea()).isEqualTo(UPDATED_DENUMIREA);
    }

    @Test
    @Transactional
    void patchNonExistingActivitatiPrincipale() throws Exception {
        int databaseSizeBeforeUpdate = activitatiPrincipaleRepository.findAll().size();
        activitatiPrincipale.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restActivitatiPrincipaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, activitatiPrincipale.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(activitatiPrincipale))
            )
            .andExpect(status().isBadRequest());

        // Validate the ActivitatiPrincipale in the database
        List<ActivitatiPrincipale> activitatiPrincipaleList = activitatiPrincipaleRepository.findAll();
        assertThat(activitatiPrincipaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchActivitatiPrincipale() throws Exception {
        int databaseSizeBeforeUpdate = activitatiPrincipaleRepository.findAll().size();
        activitatiPrincipale.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restActivitatiPrincipaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(activitatiPrincipale))
            )
            .andExpect(status().isBadRequest());

        // Validate the ActivitatiPrincipale in the database
        List<ActivitatiPrincipale> activitatiPrincipaleList = activitatiPrincipaleRepository.findAll();
        assertThat(activitatiPrincipaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamActivitatiPrincipale() throws Exception {
        int databaseSizeBeforeUpdate = activitatiPrincipaleRepository.findAll().size();
        activitatiPrincipale.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restActivitatiPrincipaleMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(activitatiPrincipale))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ActivitatiPrincipale in the database
        List<ActivitatiPrincipale> activitatiPrincipaleList = activitatiPrincipaleRepository.findAll();
        assertThat(activitatiPrincipaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteActivitatiPrincipale() throws Exception {
        // Initialize the database
        activitatiPrincipaleRepository.saveAndFlush(activitatiPrincipale);

        int databaseSizeBeforeDelete = activitatiPrincipaleRepository.findAll().size();

        // Delete the activitatiPrincipale
        restActivitatiPrincipaleMockMvc
            .perform(delete(ENTITY_API_URL_ID, activitatiPrincipale.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ActivitatiPrincipale> activitatiPrincipaleList = activitatiPrincipaleRepository.findAll();
        assertThat(activitatiPrincipaleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
