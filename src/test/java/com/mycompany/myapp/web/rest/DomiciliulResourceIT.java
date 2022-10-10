package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Domiciliul;
import com.mycompany.myapp.repository.DomiciliulRepository;
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
 * Integration tests for the {@link DomiciliulResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DomiciliulResourceIT {

    private static final String DEFAULT_ADRESA_CI = "AAAAAAAAAA";
    private static final String UPDATED_ADRESA_CI = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/domiciliuls";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DomiciliulRepository domiciliulRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDomiciliulMockMvc;

    private Domiciliul domiciliul;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Domiciliul createEntity(EntityManager em) {
        Domiciliul domiciliul = new Domiciliul().adresaCI(DEFAULT_ADRESA_CI);
        return domiciliul;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Domiciliul createUpdatedEntity(EntityManager em) {
        Domiciliul domiciliul = new Domiciliul().adresaCI(UPDATED_ADRESA_CI);
        return domiciliul;
    }

    @BeforeEach
    public void initTest() {
        domiciliul = createEntity(em);
    }

    @Test
    @Transactional
    void createDomiciliul() throws Exception {
        int databaseSizeBeforeCreate = domiciliulRepository.findAll().size();
        // Create the Domiciliul
        restDomiciliulMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(domiciliul)))
            .andExpect(status().isCreated());

        // Validate the Domiciliul in the database
        List<Domiciliul> domiciliulList = domiciliulRepository.findAll();
        assertThat(domiciliulList).hasSize(databaseSizeBeforeCreate + 1);
        Domiciliul testDomiciliul = domiciliulList.get(domiciliulList.size() - 1);
        assertThat(testDomiciliul.getAdresaCI()).isEqualTo(DEFAULT_ADRESA_CI);
    }

    @Test
    @Transactional
    void createDomiciliulWithExistingId() throws Exception {
        // Create the Domiciliul with an existing ID
        domiciliul.setId(1L);

        int databaseSizeBeforeCreate = domiciliulRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDomiciliulMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(domiciliul)))
            .andExpect(status().isBadRequest());

        // Validate the Domiciliul in the database
        List<Domiciliul> domiciliulList = domiciliulRepository.findAll();
        assertThat(domiciliulList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDomiciliuls() throws Exception {
        // Initialize the database
        domiciliulRepository.saveAndFlush(domiciliul);

        // Get all the domiciliulList
        restDomiciliulMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(domiciliul.getId().intValue())))
            .andExpect(jsonPath("$.[*].adresaCI").value(hasItem(DEFAULT_ADRESA_CI)));
    }

    @Test
    @Transactional
    void getDomiciliul() throws Exception {
        // Initialize the database
        domiciliulRepository.saveAndFlush(domiciliul);

        // Get the domiciliul
        restDomiciliulMockMvc
            .perform(get(ENTITY_API_URL_ID, domiciliul.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(domiciliul.getId().intValue()))
            .andExpect(jsonPath("$.adresaCI").value(DEFAULT_ADRESA_CI));
    }

    @Test
    @Transactional
    void getNonExistingDomiciliul() throws Exception {
        // Get the domiciliul
        restDomiciliulMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDomiciliul() throws Exception {
        // Initialize the database
        domiciliulRepository.saveAndFlush(domiciliul);

        int databaseSizeBeforeUpdate = domiciliulRepository.findAll().size();

        // Update the domiciliul
        Domiciliul updatedDomiciliul = domiciliulRepository.findById(domiciliul.getId()).get();
        // Disconnect from session so that the updates on updatedDomiciliul are not directly saved in db
        em.detach(updatedDomiciliul);
        updatedDomiciliul.adresaCI(UPDATED_ADRESA_CI);

        restDomiciliulMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDomiciliul.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDomiciliul))
            )
            .andExpect(status().isOk());

        // Validate the Domiciliul in the database
        List<Domiciliul> domiciliulList = domiciliulRepository.findAll();
        assertThat(domiciliulList).hasSize(databaseSizeBeforeUpdate);
        Domiciliul testDomiciliul = domiciliulList.get(domiciliulList.size() - 1);
        assertThat(testDomiciliul.getAdresaCI()).isEqualTo(UPDATED_ADRESA_CI);
    }

    @Test
    @Transactional
    void putNonExistingDomiciliul() throws Exception {
        int databaseSizeBeforeUpdate = domiciliulRepository.findAll().size();
        domiciliul.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDomiciliulMockMvc
            .perform(
                put(ENTITY_API_URL_ID, domiciliul.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(domiciliul))
            )
            .andExpect(status().isBadRequest());

        // Validate the Domiciliul in the database
        List<Domiciliul> domiciliulList = domiciliulRepository.findAll();
        assertThat(domiciliulList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDomiciliul() throws Exception {
        int databaseSizeBeforeUpdate = domiciliulRepository.findAll().size();
        domiciliul.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDomiciliulMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(domiciliul))
            )
            .andExpect(status().isBadRequest());

        // Validate the Domiciliul in the database
        List<Domiciliul> domiciliulList = domiciliulRepository.findAll();
        assertThat(domiciliulList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDomiciliul() throws Exception {
        int databaseSizeBeforeUpdate = domiciliulRepository.findAll().size();
        domiciliul.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDomiciliulMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(domiciliul)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Domiciliul in the database
        List<Domiciliul> domiciliulList = domiciliulRepository.findAll();
        assertThat(domiciliulList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDomiciliulWithPatch() throws Exception {
        // Initialize the database
        domiciliulRepository.saveAndFlush(domiciliul);

        int databaseSizeBeforeUpdate = domiciliulRepository.findAll().size();

        // Update the domiciliul using partial update
        Domiciliul partialUpdatedDomiciliul = new Domiciliul();
        partialUpdatedDomiciliul.setId(domiciliul.getId());

        restDomiciliulMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDomiciliul.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDomiciliul))
            )
            .andExpect(status().isOk());

        // Validate the Domiciliul in the database
        List<Domiciliul> domiciliulList = domiciliulRepository.findAll();
        assertThat(domiciliulList).hasSize(databaseSizeBeforeUpdate);
        Domiciliul testDomiciliul = domiciliulList.get(domiciliulList.size() - 1);
        assertThat(testDomiciliul.getAdresaCI()).isEqualTo(DEFAULT_ADRESA_CI);
    }

    @Test
    @Transactional
    void fullUpdateDomiciliulWithPatch() throws Exception {
        // Initialize the database
        domiciliulRepository.saveAndFlush(domiciliul);

        int databaseSizeBeforeUpdate = domiciliulRepository.findAll().size();

        // Update the domiciliul using partial update
        Domiciliul partialUpdatedDomiciliul = new Domiciliul();
        partialUpdatedDomiciliul.setId(domiciliul.getId());

        partialUpdatedDomiciliul.adresaCI(UPDATED_ADRESA_CI);

        restDomiciliulMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDomiciliul.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDomiciliul))
            )
            .andExpect(status().isOk());

        // Validate the Domiciliul in the database
        List<Domiciliul> domiciliulList = domiciliulRepository.findAll();
        assertThat(domiciliulList).hasSize(databaseSizeBeforeUpdate);
        Domiciliul testDomiciliul = domiciliulList.get(domiciliulList.size() - 1);
        assertThat(testDomiciliul.getAdresaCI()).isEqualTo(UPDATED_ADRESA_CI);
    }

    @Test
    @Transactional
    void patchNonExistingDomiciliul() throws Exception {
        int databaseSizeBeforeUpdate = domiciliulRepository.findAll().size();
        domiciliul.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDomiciliulMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, domiciliul.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(domiciliul))
            )
            .andExpect(status().isBadRequest());

        // Validate the Domiciliul in the database
        List<Domiciliul> domiciliulList = domiciliulRepository.findAll();
        assertThat(domiciliulList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDomiciliul() throws Exception {
        int databaseSizeBeforeUpdate = domiciliulRepository.findAll().size();
        domiciliul.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDomiciliulMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(domiciliul))
            )
            .andExpect(status().isBadRequest());

        // Validate the Domiciliul in the database
        List<Domiciliul> domiciliulList = domiciliulRepository.findAll();
        assertThat(domiciliulList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDomiciliul() throws Exception {
        int databaseSizeBeforeUpdate = domiciliulRepository.findAll().size();
        domiciliul.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDomiciliulMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(domiciliul))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Domiciliul in the database
        List<Domiciliul> domiciliulList = domiciliulRepository.findAll();
        assertThat(domiciliulList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDomiciliul() throws Exception {
        // Initialize the database
        domiciliulRepository.saveAndFlush(domiciliul);

        int databaseSizeBeforeDelete = domiciliulRepository.findAll().size();

        // Delete the domiciliul
        restDomiciliulMockMvc
            .perform(delete(ENTITY_API_URL_ID, domiciliul.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Domiciliul> domiciliulList = domiciliulRepository.findAll();
        assertThat(domiciliulList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
