package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Dovada;
import com.mycompany.myapp.domain.enumeration.Moneda;
import com.mycompany.myapp.repository.DovadaRepository;
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
 * Integration tests for the {@link DovadaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DovadaResourceIT {

    private static final Boolean DEFAULT_COMODAT_INCHIRIERE = false;
    private static final Boolean UPDATED_COMODAT_INCHIRIERE = true;

    private static final Integer DEFAULT_DURATA = 1;
    private static final Integer UPDATED_DURATA = 2;

    private static final Integer DEFAULT_VALOARE_INCHIRIERE = 1;
    private static final Integer UPDATED_VALOARE_INCHIRIERE = 2;

    private static final Integer DEFAULT_VALOARE_GARANTIE = 1;
    private static final Integer UPDATED_VALOARE_GARANTIE = 2;

    private static final Moneda DEFAULT_MONEDA = Moneda.RON;
    private static final Moneda UPDATED_MONEDA = Moneda.USD;

    private static final String ENTITY_API_URL = "/api/dovadas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DovadaRepository dovadaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDovadaMockMvc;

    private Dovada dovada;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dovada createEntity(EntityManager em) {
        Dovada dovada = new Dovada()
            .comodatInchiriere(DEFAULT_COMODAT_INCHIRIERE)
            .durata(DEFAULT_DURATA)
            .valoareInchiriere(DEFAULT_VALOARE_INCHIRIERE)
            .valoareGarantie(DEFAULT_VALOARE_GARANTIE)
            .moneda(DEFAULT_MONEDA);
        return dovada;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dovada createUpdatedEntity(EntityManager em) {
        Dovada dovada = new Dovada()
            .comodatInchiriere(UPDATED_COMODAT_INCHIRIERE)
            .durata(UPDATED_DURATA)
            .valoareInchiriere(UPDATED_VALOARE_INCHIRIERE)
            .valoareGarantie(UPDATED_VALOARE_GARANTIE)
            .moneda(UPDATED_MONEDA);
        return dovada;
    }

    @BeforeEach
    public void initTest() {
        dovada = createEntity(em);
    }

    @Test
    @Transactional
    void createDovada() throws Exception {
        int databaseSizeBeforeCreate = dovadaRepository.findAll().size();
        // Create the Dovada
        restDovadaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dovada)))
            .andExpect(status().isCreated());

        // Validate the Dovada in the database
        List<Dovada> dovadaList = dovadaRepository.findAll();
        assertThat(dovadaList).hasSize(databaseSizeBeforeCreate + 1);
        Dovada testDovada = dovadaList.get(dovadaList.size() - 1);
        assertThat(testDovada.getComodatInchiriere()).isEqualTo(DEFAULT_COMODAT_INCHIRIERE);
        assertThat(testDovada.getDurata()).isEqualTo(DEFAULT_DURATA);
        assertThat(testDovada.getValoareInchiriere()).isEqualTo(DEFAULT_VALOARE_INCHIRIERE);
        assertThat(testDovada.getValoareGarantie()).isEqualTo(DEFAULT_VALOARE_GARANTIE);
        assertThat(testDovada.getMoneda()).isEqualTo(DEFAULT_MONEDA);
    }

    @Test
    @Transactional
    void createDovadaWithExistingId() throws Exception {
        // Create the Dovada with an existing ID
        dovada.setId(1L);

        int databaseSizeBeforeCreate = dovadaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDovadaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dovada)))
            .andExpect(status().isBadRequest());

        // Validate the Dovada in the database
        List<Dovada> dovadaList = dovadaRepository.findAll();
        assertThat(dovadaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDovadas() throws Exception {
        // Initialize the database
        dovadaRepository.saveAndFlush(dovada);

        // Get all the dovadaList
        restDovadaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dovada.getId().intValue())))
            .andExpect(jsonPath("$.[*].comodatInchiriere").value(hasItem(DEFAULT_COMODAT_INCHIRIERE.booleanValue())))
            .andExpect(jsonPath("$.[*].durata").value(hasItem(DEFAULT_DURATA)))
            .andExpect(jsonPath("$.[*].valoareInchiriere").value(hasItem(DEFAULT_VALOARE_INCHIRIERE)))
            .andExpect(jsonPath("$.[*].valoareGarantie").value(hasItem(DEFAULT_VALOARE_GARANTIE)))
            .andExpect(jsonPath("$.[*].moneda").value(hasItem(DEFAULT_MONEDA.toString())));
    }

    @Test
    @Transactional
    void getDovada() throws Exception {
        // Initialize the database
        dovadaRepository.saveAndFlush(dovada);

        // Get the dovada
        restDovadaMockMvc
            .perform(get(ENTITY_API_URL_ID, dovada.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dovada.getId().intValue()))
            .andExpect(jsonPath("$.comodatInchiriere").value(DEFAULT_COMODAT_INCHIRIERE.booleanValue()))
            .andExpect(jsonPath("$.durata").value(DEFAULT_DURATA))
            .andExpect(jsonPath("$.valoareInchiriere").value(DEFAULT_VALOARE_INCHIRIERE))
            .andExpect(jsonPath("$.valoareGarantie").value(DEFAULT_VALOARE_GARANTIE))
            .andExpect(jsonPath("$.moneda").value(DEFAULT_MONEDA.toString()));
    }

    @Test
    @Transactional
    void getNonExistingDovada() throws Exception {
        // Get the dovada
        restDovadaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDovada() throws Exception {
        // Initialize the database
        dovadaRepository.saveAndFlush(dovada);

        int databaseSizeBeforeUpdate = dovadaRepository.findAll().size();

        // Update the dovada
        Dovada updatedDovada = dovadaRepository.findById(dovada.getId()).get();
        // Disconnect from session so that the updates on updatedDovada are not directly saved in db
        em.detach(updatedDovada);
        updatedDovada
            .comodatInchiriere(UPDATED_COMODAT_INCHIRIERE)
            .durata(UPDATED_DURATA)
            .valoareInchiriere(UPDATED_VALOARE_INCHIRIERE)
            .valoareGarantie(UPDATED_VALOARE_GARANTIE)
            .moneda(UPDATED_MONEDA);

        restDovadaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDovada.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDovada))
            )
            .andExpect(status().isOk());

        // Validate the Dovada in the database
        List<Dovada> dovadaList = dovadaRepository.findAll();
        assertThat(dovadaList).hasSize(databaseSizeBeforeUpdate);
        Dovada testDovada = dovadaList.get(dovadaList.size() - 1);
        assertThat(testDovada.getComodatInchiriere()).isEqualTo(UPDATED_COMODAT_INCHIRIERE);
        assertThat(testDovada.getDurata()).isEqualTo(UPDATED_DURATA);
        assertThat(testDovada.getValoareInchiriere()).isEqualTo(UPDATED_VALOARE_INCHIRIERE);
        assertThat(testDovada.getValoareGarantie()).isEqualTo(UPDATED_VALOARE_GARANTIE);
        assertThat(testDovada.getMoneda()).isEqualTo(UPDATED_MONEDA);
    }

    @Test
    @Transactional
    void putNonExistingDovada() throws Exception {
        int databaseSizeBeforeUpdate = dovadaRepository.findAll().size();
        dovada.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDovadaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dovada.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dovada))
            )
            .andExpect(status().isBadRequest());

        // Validate the Dovada in the database
        List<Dovada> dovadaList = dovadaRepository.findAll();
        assertThat(dovadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDovada() throws Exception {
        int databaseSizeBeforeUpdate = dovadaRepository.findAll().size();
        dovada.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDovadaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dovada))
            )
            .andExpect(status().isBadRequest());

        // Validate the Dovada in the database
        List<Dovada> dovadaList = dovadaRepository.findAll();
        assertThat(dovadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDovada() throws Exception {
        int databaseSizeBeforeUpdate = dovadaRepository.findAll().size();
        dovada.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDovadaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dovada)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Dovada in the database
        List<Dovada> dovadaList = dovadaRepository.findAll();
        assertThat(dovadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDovadaWithPatch() throws Exception {
        // Initialize the database
        dovadaRepository.saveAndFlush(dovada);

        int databaseSizeBeforeUpdate = dovadaRepository.findAll().size();

        // Update the dovada using partial update
        Dovada partialUpdatedDovada = new Dovada();
        partialUpdatedDovada.setId(dovada.getId());

        partialUpdatedDovada.comodatInchiriere(UPDATED_COMODAT_INCHIRIERE);

        restDovadaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDovada.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDovada))
            )
            .andExpect(status().isOk());

        // Validate the Dovada in the database
        List<Dovada> dovadaList = dovadaRepository.findAll();
        assertThat(dovadaList).hasSize(databaseSizeBeforeUpdate);
        Dovada testDovada = dovadaList.get(dovadaList.size() - 1);
        assertThat(testDovada.getComodatInchiriere()).isEqualTo(UPDATED_COMODAT_INCHIRIERE);
        assertThat(testDovada.getDurata()).isEqualTo(DEFAULT_DURATA);
        assertThat(testDovada.getValoareInchiriere()).isEqualTo(DEFAULT_VALOARE_INCHIRIERE);
        assertThat(testDovada.getValoareGarantie()).isEqualTo(DEFAULT_VALOARE_GARANTIE);
        assertThat(testDovada.getMoneda()).isEqualTo(DEFAULT_MONEDA);
    }

    @Test
    @Transactional
    void fullUpdateDovadaWithPatch() throws Exception {
        // Initialize the database
        dovadaRepository.saveAndFlush(dovada);

        int databaseSizeBeforeUpdate = dovadaRepository.findAll().size();

        // Update the dovada using partial update
        Dovada partialUpdatedDovada = new Dovada();
        partialUpdatedDovada.setId(dovada.getId());

        partialUpdatedDovada
            .comodatInchiriere(UPDATED_COMODAT_INCHIRIERE)
            .durata(UPDATED_DURATA)
            .valoareInchiriere(UPDATED_VALOARE_INCHIRIERE)
            .valoareGarantie(UPDATED_VALOARE_GARANTIE)
            .moneda(UPDATED_MONEDA);

        restDovadaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDovada.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDovada))
            )
            .andExpect(status().isOk());

        // Validate the Dovada in the database
        List<Dovada> dovadaList = dovadaRepository.findAll();
        assertThat(dovadaList).hasSize(databaseSizeBeforeUpdate);
        Dovada testDovada = dovadaList.get(dovadaList.size() - 1);
        assertThat(testDovada.getComodatInchiriere()).isEqualTo(UPDATED_COMODAT_INCHIRIERE);
        assertThat(testDovada.getDurata()).isEqualTo(UPDATED_DURATA);
        assertThat(testDovada.getValoareInchiriere()).isEqualTo(UPDATED_VALOARE_INCHIRIERE);
        assertThat(testDovada.getValoareGarantie()).isEqualTo(UPDATED_VALOARE_GARANTIE);
        assertThat(testDovada.getMoneda()).isEqualTo(UPDATED_MONEDA);
    }

    @Test
    @Transactional
    void patchNonExistingDovada() throws Exception {
        int databaseSizeBeforeUpdate = dovadaRepository.findAll().size();
        dovada.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDovadaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dovada.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dovada))
            )
            .andExpect(status().isBadRequest());

        // Validate the Dovada in the database
        List<Dovada> dovadaList = dovadaRepository.findAll();
        assertThat(dovadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDovada() throws Exception {
        int databaseSizeBeforeUpdate = dovadaRepository.findAll().size();
        dovada.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDovadaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dovada))
            )
            .andExpect(status().isBadRequest());

        // Validate the Dovada in the database
        List<Dovada> dovadaList = dovadaRepository.findAll();
        assertThat(dovadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDovada() throws Exception {
        int databaseSizeBeforeUpdate = dovadaRepository.findAll().size();
        dovada.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDovadaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(dovada)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Dovada in the database
        List<Dovada> dovadaList = dovadaRepository.findAll();
        assertThat(dovadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDovada() throws Exception {
        // Initialize the database
        dovadaRepository.saveAndFlush(dovada);

        int databaseSizeBeforeDelete = dovadaRepository.findAll().size();

        // Delete the dovada
        restDovadaMockMvc
            .perform(delete(ENTITY_API_URL_ID, dovada.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Dovada> dovadaList = dovadaRepository.findAll();
        assertThat(dovadaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
