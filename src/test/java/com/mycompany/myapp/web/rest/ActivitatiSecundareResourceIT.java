package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ActivitatiSecundare;
import com.mycompany.myapp.repository.ActivitatiSecundareRepository;
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
 * Integration tests for the {@link ActivitatiSecundareResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ActivitatiSecundareResourceIT {

    private static final String DEFAULT_COD_CAEN = "AAAAAAAAAA";
    private static final String UPDATED_COD_CAEN = "BBBBBBBBBB";

    private static final String DEFAULT_DENUMIREA = "AAAAAAAAAA";
    private static final String UPDATED_DENUMIREA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/activitati-secundares";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ActivitatiSecundareRepository activitatiSecundareRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restActivitatiSecundareMockMvc;

    private ActivitatiSecundare activitatiSecundare;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ActivitatiSecundare createEntity(EntityManager em) {
        ActivitatiSecundare activitatiSecundare = new ActivitatiSecundare().codCAEN(DEFAULT_COD_CAEN).denumirea(DEFAULT_DENUMIREA);
        return activitatiSecundare;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ActivitatiSecundare createUpdatedEntity(EntityManager em) {
        ActivitatiSecundare activitatiSecundare = new ActivitatiSecundare().codCAEN(UPDATED_COD_CAEN).denumirea(UPDATED_DENUMIREA);
        return activitatiSecundare;
    }

    @BeforeEach
    public void initTest() {
        activitatiSecundare = createEntity(em);
    }

    @Test
    @Transactional
    void createActivitatiSecundare() throws Exception {
        int databaseSizeBeforeCreate = activitatiSecundareRepository.findAll().size();
        // Create the ActivitatiSecundare
        restActivitatiSecundareMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(activitatiSecundare))
            )
            .andExpect(status().isCreated());

        // Validate the ActivitatiSecundare in the database
        List<ActivitatiSecundare> activitatiSecundareList = activitatiSecundareRepository.findAll();
        assertThat(activitatiSecundareList).hasSize(databaseSizeBeforeCreate + 1);
        ActivitatiSecundare testActivitatiSecundare = activitatiSecundareList.get(activitatiSecundareList.size() - 1);
        assertThat(testActivitatiSecundare.getCodCAEN()).isEqualTo(DEFAULT_COD_CAEN);
        assertThat(testActivitatiSecundare.getDenumirea()).isEqualTo(DEFAULT_DENUMIREA);
    }

    @Test
    @Transactional
    void createActivitatiSecundareWithExistingId() throws Exception {
        // Create the ActivitatiSecundare with an existing ID
        activitatiSecundare.setId(1L);

        int databaseSizeBeforeCreate = activitatiSecundareRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restActivitatiSecundareMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(activitatiSecundare))
            )
            .andExpect(status().isBadRequest());

        // Validate the ActivitatiSecundare in the database
        List<ActivitatiSecundare> activitatiSecundareList = activitatiSecundareRepository.findAll();
        assertThat(activitatiSecundareList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllActivitatiSecundares() throws Exception {
        // Initialize the database
        activitatiSecundareRepository.saveAndFlush(activitatiSecundare);

        // Get all the activitatiSecundareList
        restActivitatiSecundareMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(activitatiSecundare.getId().intValue())))
            .andExpect(jsonPath("$.[*].codCAEN").value(hasItem(DEFAULT_COD_CAEN)))
            .andExpect(jsonPath("$.[*].denumirea").value(hasItem(DEFAULT_DENUMIREA)));
    }

    @Test
    @Transactional
    void getActivitatiSecundare() throws Exception {
        // Initialize the database
        activitatiSecundareRepository.saveAndFlush(activitatiSecundare);

        // Get the activitatiSecundare
        restActivitatiSecundareMockMvc
            .perform(get(ENTITY_API_URL_ID, activitatiSecundare.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(activitatiSecundare.getId().intValue()))
            .andExpect(jsonPath("$.codCAEN").value(DEFAULT_COD_CAEN))
            .andExpect(jsonPath("$.denumirea").value(DEFAULT_DENUMIREA));
    }

    @Test
    @Transactional
    void getNonExistingActivitatiSecundare() throws Exception {
        // Get the activitatiSecundare
        restActivitatiSecundareMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingActivitatiSecundare() throws Exception {
        // Initialize the database
        activitatiSecundareRepository.saveAndFlush(activitatiSecundare);

        int databaseSizeBeforeUpdate = activitatiSecundareRepository.findAll().size();

        // Update the activitatiSecundare
        ActivitatiSecundare updatedActivitatiSecundare = activitatiSecundareRepository.findById(activitatiSecundare.getId()).get();
        // Disconnect from session so that the updates on updatedActivitatiSecundare are not directly saved in db
        em.detach(updatedActivitatiSecundare);
        updatedActivitatiSecundare.codCAEN(UPDATED_COD_CAEN).denumirea(UPDATED_DENUMIREA);

        restActivitatiSecundareMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedActivitatiSecundare.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedActivitatiSecundare))
            )
            .andExpect(status().isOk());

        // Validate the ActivitatiSecundare in the database
        List<ActivitatiSecundare> activitatiSecundareList = activitatiSecundareRepository.findAll();
        assertThat(activitatiSecundareList).hasSize(databaseSizeBeforeUpdate);
        ActivitatiSecundare testActivitatiSecundare = activitatiSecundareList.get(activitatiSecundareList.size() - 1);
        assertThat(testActivitatiSecundare.getCodCAEN()).isEqualTo(UPDATED_COD_CAEN);
        assertThat(testActivitatiSecundare.getDenumirea()).isEqualTo(UPDATED_DENUMIREA);
    }

    @Test
    @Transactional
    void putNonExistingActivitatiSecundare() throws Exception {
        int databaseSizeBeforeUpdate = activitatiSecundareRepository.findAll().size();
        activitatiSecundare.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restActivitatiSecundareMockMvc
            .perform(
                put(ENTITY_API_URL_ID, activitatiSecundare.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(activitatiSecundare))
            )
            .andExpect(status().isBadRequest());

        // Validate the ActivitatiSecundare in the database
        List<ActivitatiSecundare> activitatiSecundareList = activitatiSecundareRepository.findAll();
        assertThat(activitatiSecundareList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchActivitatiSecundare() throws Exception {
        int databaseSizeBeforeUpdate = activitatiSecundareRepository.findAll().size();
        activitatiSecundare.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restActivitatiSecundareMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(activitatiSecundare))
            )
            .andExpect(status().isBadRequest());

        // Validate the ActivitatiSecundare in the database
        List<ActivitatiSecundare> activitatiSecundareList = activitatiSecundareRepository.findAll();
        assertThat(activitatiSecundareList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamActivitatiSecundare() throws Exception {
        int databaseSizeBeforeUpdate = activitatiSecundareRepository.findAll().size();
        activitatiSecundare.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restActivitatiSecundareMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(activitatiSecundare))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ActivitatiSecundare in the database
        List<ActivitatiSecundare> activitatiSecundareList = activitatiSecundareRepository.findAll();
        assertThat(activitatiSecundareList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateActivitatiSecundareWithPatch() throws Exception {
        // Initialize the database
        activitatiSecundareRepository.saveAndFlush(activitatiSecundare);

        int databaseSizeBeforeUpdate = activitatiSecundareRepository.findAll().size();

        // Update the activitatiSecundare using partial update
        ActivitatiSecundare partialUpdatedActivitatiSecundare = new ActivitatiSecundare();
        partialUpdatedActivitatiSecundare.setId(activitatiSecundare.getId());

        partialUpdatedActivitatiSecundare.codCAEN(UPDATED_COD_CAEN);

        restActivitatiSecundareMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedActivitatiSecundare.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedActivitatiSecundare))
            )
            .andExpect(status().isOk());

        // Validate the ActivitatiSecundare in the database
        List<ActivitatiSecundare> activitatiSecundareList = activitatiSecundareRepository.findAll();
        assertThat(activitatiSecundareList).hasSize(databaseSizeBeforeUpdate);
        ActivitatiSecundare testActivitatiSecundare = activitatiSecundareList.get(activitatiSecundareList.size() - 1);
        assertThat(testActivitatiSecundare.getCodCAEN()).isEqualTo(UPDATED_COD_CAEN);
        assertThat(testActivitatiSecundare.getDenumirea()).isEqualTo(DEFAULT_DENUMIREA);
    }

    @Test
    @Transactional
    void fullUpdateActivitatiSecundareWithPatch() throws Exception {
        // Initialize the database
        activitatiSecundareRepository.saveAndFlush(activitatiSecundare);

        int databaseSizeBeforeUpdate = activitatiSecundareRepository.findAll().size();

        // Update the activitatiSecundare using partial update
        ActivitatiSecundare partialUpdatedActivitatiSecundare = new ActivitatiSecundare();
        partialUpdatedActivitatiSecundare.setId(activitatiSecundare.getId());

        partialUpdatedActivitatiSecundare.codCAEN(UPDATED_COD_CAEN).denumirea(UPDATED_DENUMIREA);

        restActivitatiSecundareMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedActivitatiSecundare.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedActivitatiSecundare))
            )
            .andExpect(status().isOk());

        // Validate the ActivitatiSecundare in the database
        List<ActivitatiSecundare> activitatiSecundareList = activitatiSecundareRepository.findAll();
        assertThat(activitatiSecundareList).hasSize(databaseSizeBeforeUpdate);
        ActivitatiSecundare testActivitatiSecundare = activitatiSecundareList.get(activitatiSecundareList.size() - 1);
        assertThat(testActivitatiSecundare.getCodCAEN()).isEqualTo(UPDATED_COD_CAEN);
        assertThat(testActivitatiSecundare.getDenumirea()).isEqualTo(UPDATED_DENUMIREA);
    }

    @Test
    @Transactional
    void patchNonExistingActivitatiSecundare() throws Exception {
        int databaseSizeBeforeUpdate = activitatiSecundareRepository.findAll().size();
        activitatiSecundare.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restActivitatiSecundareMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, activitatiSecundare.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(activitatiSecundare))
            )
            .andExpect(status().isBadRequest());

        // Validate the ActivitatiSecundare in the database
        List<ActivitatiSecundare> activitatiSecundareList = activitatiSecundareRepository.findAll();
        assertThat(activitatiSecundareList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchActivitatiSecundare() throws Exception {
        int databaseSizeBeforeUpdate = activitatiSecundareRepository.findAll().size();
        activitatiSecundare.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restActivitatiSecundareMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(activitatiSecundare))
            )
            .andExpect(status().isBadRequest());

        // Validate the ActivitatiSecundare in the database
        List<ActivitatiSecundare> activitatiSecundareList = activitatiSecundareRepository.findAll();
        assertThat(activitatiSecundareList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamActivitatiSecundare() throws Exception {
        int databaseSizeBeforeUpdate = activitatiSecundareRepository.findAll().size();
        activitatiSecundare.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restActivitatiSecundareMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(activitatiSecundare))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ActivitatiSecundare in the database
        List<ActivitatiSecundare> activitatiSecundareList = activitatiSecundareRepository.findAll();
        assertThat(activitatiSecundareList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteActivitatiSecundare() throws Exception {
        // Initialize the database
        activitatiSecundareRepository.saveAndFlush(activitatiSecundare);

        int databaseSizeBeforeDelete = activitatiSecundareRepository.findAll().size();

        // Delete the activitatiSecundare
        restActivitatiSecundareMockMvc
            .perform(delete(ENTITY_API_URL_ID, activitatiSecundare.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ActivitatiSecundare> activitatiSecundareList = activitatiSecundareRepository.findAll();
        assertThat(activitatiSecundareList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
