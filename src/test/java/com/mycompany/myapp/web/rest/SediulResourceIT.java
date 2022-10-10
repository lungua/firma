package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Sediul;
import com.mycompany.myapp.repository.SediulRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link SediulResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class SediulResourceIT {

    private static final Boolean DEFAULT_SEDIUSOCIAL_PUNCT_LUCRU = false;
    private static final Boolean UPDATED_SEDIUSOCIAL_PUNCT_LUCRU = true;

    private static final String ENTITY_API_URL = "/api/sediuls";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SediulRepository sediulRepository;

    @Mock
    private SediulRepository sediulRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSediulMockMvc;

    private Sediul sediul;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sediul createEntity(EntityManager em) {
        Sediul sediul = new Sediul().sediusocialPunctLucru(DEFAULT_SEDIUSOCIAL_PUNCT_LUCRU);
        return sediul;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sediul createUpdatedEntity(EntityManager em) {
        Sediul sediul = new Sediul().sediusocialPunctLucru(UPDATED_SEDIUSOCIAL_PUNCT_LUCRU);
        return sediul;
    }

    @BeforeEach
    public void initTest() {
        sediul = createEntity(em);
    }

    @Test
    @Transactional
    void createSediul() throws Exception {
        int databaseSizeBeforeCreate = sediulRepository.findAll().size();
        // Create the Sediul
        restSediulMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sediul)))
            .andExpect(status().isCreated());

        // Validate the Sediul in the database
        List<Sediul> sediulList = sediulRepository.findAll();
        assertThat(sediulList).hasSize(databaseSizeBeforeCreate + 1);
        Sediul testSediul = sediulList.get(sediulList.size() - 1);
        assertThat(testSediul.getSediusocialPunctLucru()).isEqualTo(DEFAULT_SEDIUSOCIAL_PUNCT_LUCRU);
    }

    @Test
    @Transactional
    void createSediulWithExistingId() throws Exception {
        // Create the Sediul with an existing ID
        sediul.setId(1L);

        int databaseSizeBeforeCreate = sediulRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSediulMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sediul)))
            .andExpect(status().isBadRequest());

        // Validate the Sediul in the database
        List<Sediul> sediulList = sediulRepository.findAll();
        assertThat(sediulList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSediuls() throws Exception {
        // Initialize the database
        sediulRepository.saveAndFlush(sediul);

        // Get all the sediulList
        restSediulMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sediul.getId().intValue())))
            .andExpect(jsonPath("$.[*].sediusocialPunctLucru").value(hasItem(DEFAULT_SEDIUSOCIAL_PUNCT_LUCRU.booleanValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllSediulsWithEagerRelationshipsIsEnabled() throws Exception {
        when(sediulRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSediulMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(sediulRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllSediulsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(sediulRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSediulMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(sediulRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getSediul() throws Exception {
        // Initialize the database
        sediulRepository.saveAndFlush(sediul);

        // Get the sediul
        restSediulMockMvc
            .perform(get(ENTITY_API_URL_ID, sediul.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sediul.getId().intValue()))
            .andExpect(jsonPath("$.sediusocialPunctLucru").value(DEFAULT_SEDIUSOCIAL_PUNCT_LUCRU.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingSediul() throws Exception {
        // Get the sediul
        restSediulMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSediul() throws Exception {
        // Initialize the database
        sediulRepository.saveAndFlush(sediul);

        int databaseSizeBeforeUpdate = sediulRepository.findAll().size();

        // Update the sediul
        Sediul updatedSediul = sediulRepository.findById(sediul.getId()).get();
        // Disconnect from session so that the updates on updatedSediul are not directly saved in db
        em.detach(updatedSediul);
        updatedSediul.sediusocialPunctLucru(UPDATED_SEDIUSOCIAL_PUNCT_LUCRU);

        restSediulMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSediul.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSediul))
            )
            .andExpect(status().isOk());

        // Validate the Sediul in the database
        List<Sediul> sediulList = sediulRepository.findAll();
        assertThat(sediulList).hasSize(databaseSizeBeforeUpdate);
        Sediul testSediul = sediulList.get(sediulList.size() - 1);
        assertThat(testSediul.getSediusocialPunctLucru()).isEqualTo(UPDATED_SEDIUSOCIAL_PUNCT_LUCRU);
    }

    @Test
    @Transactional
    void putNonExistingSediul() throws Exception {
        int databaseSizeBeforeUpdate = sediulRepository.findAll().size();
        sediul.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSediulMockMvc
            .perform(
                put(ENTITY_API_URL_ID, sediul.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sediul))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sediul in the database
        List<Sediul> sediulList = sediulRepository.findAll();
        assertThat(sediulList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSediul() throws Exception {
        int databaseSizeBeforeUpdate = sediulRepository.findAll().size();
        sediul.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSediulMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sediul))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sediul in the database
        List<Sediul> sediulList = sediulRepository.findAll();
        assertThat(sediulList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSediul() throws Exception {
        int databaseSizeBeforeUpdate = sediulRepository.findAll().size();
        sediul.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSediulMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sediul)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Sediul in the database
        List<Sediul> sediulList = sediulRepository.findAll();
        assertThat(sediulList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSediulWithPatch() throws Exception {
        // Initialize the database
        sediulRepository.saveAndFlush(sediul);

        int databaseSizeBeforeUpdate = sediulRepository.findAll().size();

        // Update the sediul using partial update
        Sediul partialUpdatedSediul = new Sediul();
        partialUpdatedSediul.setId(sediul.getId());

        partialUpdatedSediul.sediusocialPunctLucru(UPDATED_SEDIUSOCIAL_PUNCT_LUCRU);

        restSediulMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSediul.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSediul))
            )
            .andExpect(status().isOk());

        // Validate the Sediul in the database
        List<Sediul> sediulList = sediulRepository.findAll();
        assertThat(sediulList).hasSize(databaseSizeBeforeUpdate);
        Sediul testSediul = sediulList.get(sediulList.size() - 1);
        assertThat(testSediul.getSediusocialPunctLucru()).isEqualTo(UPDATED_SEDIUSOCIAL_PUNCT_LUCRU);
    }

    @Test
    @Transactional
    void fullUpdateSediulWithPatch() throws Exception {
        // Initialize the database
        sediulRepository.saveAndFlush(sediul);

        int databaseSizeBeforeUpdate = sediulRepository.findAll().size();

        // Update the sediul using partial update
        Sediul partialUpdatedSediul = new Sediul();
        partialUpdatedSediul.setId(sediul.getId());

        partialUpdatedSediul.sediusocialPunctLucru(UPDATED_SEDIUSOCIAL_PUNCT_LUCRU);

        restSediulMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSediul.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSediul))
            )
            .andExpect(status().isOk());

        // Validate the Sediul in the database
        List<Sediul> sediulList = sediulRepository.findAll();
        assertThat(sediulList).hasSize(databaseSizeBeforeUpdate);
        Sediul testSediul = sediulList.get(sediulList.size() - 1);
        assertThat(testSediul.getSediusocialPunctLucru()).isEqualTo(UPDATED_SEDIUSOCIAL_PUNCT_LUCRU);
    }

    @Test
    @Transactional
    void patchNonExistingSediul() throws Exception {
        int databaseSizeBeforeUpdate = sediulRepository.findAll().size();
        sediul.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSediulMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, sediul.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sediul))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sediul in the database
        List<Sediul> sediulList = sediulRepository.findAll();
        assertThat(sediulList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSediul() throws Exception {
        int databaseSizeBeforeUpdate = sediulRepository.findAll().size();
        sediul.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSediulMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sediul))
            )
            .andExpect(status().isBadRequest());

        // Validate the Sediul in the database
        List<Sediul> sediulList = sediulRepository.findAll();
        assertThat(sediulList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSediul() throws Exception {
        int databaseSizeBeforeUpdate = sediulRepository.findAll().size();
        sediul.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSediulMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(sediul)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Sediul in the database
        List<Sediul> sediulList = sediulRepository.findAll();
        assertThat(sediulList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSediul() throws Exception {
        // Initialize the database
        sediulRepository.saveAndFlush(sediul);

        int databaseSizeBeforeDelete = sediulRepository.findAll().size();

        // Delete the sediul
        restSediulMockMvc
            .perform(delete(ENTITY_API_URL_ID, sediul.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sediul> sediulList = sediulRepository.findAll();
        assertThat(sediulList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
