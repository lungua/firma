package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Proprietari;
import com.mycompany.myapp.domain.enumeration.FizicJuridic;
import com.mycompany.myapp.repository.ProprietariRepository;
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
 * Integration tests for the {@link ProprietariResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProprietariResourceIT {

    private static final FizicJuridic DEFAULT_FIZIC_JURIDIC = FizicJuridic.FIZIC;
    private static final FizicJuridic UPDATED_FIZIC_JURIDIC = FizicJuridic.JURIDIC;

    private static final String DEFAULT_NUME = "AAAAAAAAAA";
    private static final String UPDATED_NUME = "BBBBBBBBBB";

    private static final String DEFAULT_PRENUME = "AAAAAAAAAA";
    private static final String UPDATED_PRENUME = "BBBBBBBBBB";

    private static final String DEFAULT_TIP = "AAAAAAAAAA";
    private static final String UPDATED_TIP = "BBBBBBBBBB";

    private static final String DEFAULT_SERIE = "AAAAAAAAAA";
    private static final String UPDATED_SERIE = "BBBBBBBBBB";

    private static final String DEFAULT_NUMAR = "AAAAAAAAAA";
    private static final String UPDATED_NUMAR = "BBBBBBBBBB";

    private static final String DEFAULT_CUI = "AAAAAAAAAA";
    private static final String UPDATED_CUI = "BBBBBBBBBB";

    private static final String DEFAULT_DENUMIRE_SOCIETATE = "AAAAAAAAAA";
    private static final String UPDATED_DENUMIRE_SOCIETATE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/proprietaris";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProprietariRepository proprietariRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProprietariMockMvc;

    private Proprietari proprietari;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proprietari createEntity(EntityManager em) {
        Proprietari proprietari = new Proprietari()
            .fizicJuridic(DEFAULT_FIZIC_JURIDIC)
            .nume(DEFAULT_NUME)
            .prenume(DEFAULT_PRENUME)
            .tip(DEFAULT_TIP)
            .serie(DEFAULT_SERIE)
            .numar(DEFAULT_NUMAR)
            .cui(DEFAULT_CUI)
            .denumireSocietate(DEFAULT_DENUMIRE_SOCIETATE);
        return proprietari;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Proprietari createUpdatedEntity(EntityManager em) {
        Proprietari proprietari = new Proprietari()
            .fizicJuridic(UPDATED_FIZIC_JURIDIC)
            .nume(UPDATED_NUME)
            .prenume(UPDATED_PRENUME)
            .tip(UPDATED_TIP)
            .serie(UPDATED_SERIE)
            .numar(UPDATED_NUMAR)
            .cui(UPDATED_CUI)
            .denumireSocietate(UPDATED_DENUMIRE_SOCIETATE);
        return proprietari;
    }

    @BeforeEach
    public void initTest() {
        proprietari = createEntity(em);
    }

    @Test
    @Transactional
    void createProprietari() throws Exception {
        int databaseSizeBeforeCreate = proprietariRepository.findAll().size();
        // Create the Proprietari
        restProprietariMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proprietari)))
            .andExpect(status().isCreated());

        // Validate the Proprietari in the database
        List<Proprietari> proprietariList = proprietariRepository.findAll();
        assertThat(proprietariList).hasSize(databaseSizeBeforeCreate + 1);
        Proprietari testProprietari = proprietariList.get(proprietariList.size() - 1);
        assertThat(testProprietari.getFizicJuridic()).isEqualTo(DEFAULT_FIZIC_JURIDIC);
        assertThat(testProprietari.getNume()).isEqualTo(DEFAULT_NUME);
        assertThat(testProprietari.getPrenume()).isEqualTo(DEFAULT_PRENUME);
        assertThat(testProprietari.getTip()).isEqualTo(DEFAULT_TIP);
        assertThat(testProprietari.getSerie()).isEqualTo(DEFAULT_SERIE);
        assertThat(testProprietari.getNumar()).isEqualTo(DEFAULT_NUMAR);
        assertThat(testProprietari.getCui()).isEqualTo(DEFAULT_CUI);
        assertThat(testProprietari.getDenumireSocietate()).isEqualTo(DEFAULT_DENUMIRE_SOCIETATE);
    }

    @Test
    @Transactional
    void createProprietariWithExistingId() throws Exception {
        // Create the Proprietari with an existing ID
        proprietari.setId(1L);

        int databaseSizeBeforeCreate = proprietariRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProprietariMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proprietari)))
            .andExpect(status().isBadRequest());

        // Validate the Proprietari in the database
        List<Proprietari> proprietariList = proprietariRepository.findAll();
        assertThat(proprietariList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllProprietaris() throws Exception {
        // Initialize the database
        proprietariRepository.saveAndFlush(proprietari);

        // Get all the proprietariList
        restProprietariMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proprietari.getId().intValue())))
            .andExpect(jsonPath("$.[*].fizicJuridic").value(hasItem(DEFAULT_FIZIC_JURIDIC.toString())))
            .andExpect(jsonPath("$.[*].nume").value(hasItem(DEFAULT_NUME)))
            .andExpect(jsonPath("$.[*].prenume").value(hasItem(DEFAULT_PRENUME)))
            .andExpect(jsonPath("$.[*].tip").value(hasItem(DEFAULT_TIP)))
            .andExpect(jsonPath("$.[*].serie").value(hasItem(DEFAULT_SERIE)))
            .andExpect(jsonPath("$.[*].numar").value(hasItem(DEFAULT_NUMAR)))
            .andExpect(jsonPath("$.[*].cui").value(hasItem(DEFAULT_CUI)))
            .andExpect(jsonPath("$.[*].denumireSocietate").value(hasItem(DEFAULT_DENUMIRE_SOCIETATE)));
    }

    @Test
    @Transactional
    void getProprietari() throws Exception {
        // Initialize the database
        proprietariRepository.saveAndFlush(proprietari);

        // Get the proprietari
        restProprietariMockMvc
            .perform(get(ENTITY_API_URL_ID, proprietari.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(proprietari.getId().intValue()))
            .andExpect(jsonPath("$.fizicJuridic").value(DEFAULT_FIZIC_JURIDIC.toString()))
            .andExpect(jsonPath("$.nume").value(DEFAULT_NUME))
            .andExpect(jsonPath("$.prenume").value(DEFAULT_PRENUME))
            .andExpect(jsonPath("$.tip").value(DEFAULT_TIP))
            .andExpect(jsonPath("$.serie").value(DEFAULT_SERIE))
            .andExpect(jsonPath("$.numar").value(DEFAULT_NUMAR))
            .andExpect(jsonPath("$.cui").value(DEFAULT_CUI))
            .andExpect(jsonPath("$.denumireSocietate").value(DEFAULT_DENUMIRE_SOCIETATE));
    }

    @Test
    @Transactional
    void getNonExistingProprietari() throws Exception {
        // Get the proprietari
        restProprietariMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingProprietari() throws Exception {
        // Initialize the database
        proprietariRepository.saveAndFlush(proprietari);

        int databaseSizeBeforeUpdate = proprietariRepository.findAll().size();

        // Update the proprietari
        Proprietari updatedProprietari = proprietariRepository.findById(proprietari.getId()).get();
        // Disconnect from session so that the updates on updatedProprietari are not directly saved in db
        em.detach(updatedProprietari);
        updatedProprietari
            .fizicJuridic(UPDATED_FIZIC_JURIDIC)
            .nume(UPDATED_NUME)
            .prenume(UPDATED_PRENUME)
            .tip(UPDATED_TIP)
            .serie(UPDATED_SERIE)
            .numar(UPDATED_NUMAR)
            .cui(UPDATED_CUI)
            .denumireSocietate(UPDATED_DENUMIRE_SOCIETATE);

        restProprietariMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProprietari.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProprietari))
            )
            .andExpect(status().isOk());

        // Validate the Proprietari in the database
        List<Proprietari> proprietariList = proprietariRepository.findAll();
        assertThat(proprietariList).hasSize(databaseSizeBeforeUpdate);
        Proprietari testProprietari = proprietariList.get(proprietariList.size() - 1);
        assertThat(testProprietari.getFizicJuridic()).isEqualTo(UPDATED_FIZIC_JURIDIC);
        assertThat(testProprietari.getNume()).isEqualTo(UPDATED_NUME);
        assertThat(testProprietari.getPrenume()).isEqualTo(UPDATED_PRENUME);
        assertThat(testProprietari.getTip()).isEqualTo(UPDATED_TIP);
        assertThat(testProprietari.getSerie()).isEqualTo(UPDATED_SERIE);
        assertThat(testProprietari.getNumar()).isEqualTo(UPDATED_NUMAR);
        assertThat(testProprietari.getCui()).isEqualTo(UPDATED_CUI);
        assertThat(testProprietari.getDenumireSocietate()).isEqualTo(UPDATED_DENUMIRE_SOCIETATE);
    }

    @Test
    @Transactional
    void putNonExistingProprietari() throws Exception {
        int databaseSizeBeforeUpdate = proprietariRepository.findAll().size();
        proprietari.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProprietariMockMvc
            .perform(
                put(ENTITY_API_URL_ID, proprietari.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(proprietari))
            )
            .andExpect(status().isBadRequest());

        // Validate the Proprietari in the database
        List<Proprietari> proprietariList = proprietariRepository.findAll();
        assertThat(proprietariList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProprietari() throws Exception {
        int databaseSizeBeforeUpdate = proprietariRepository.findAll().size();
        proprietari.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProprietariMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(proprietari))
            )
            .andExpect(status().isBadRequest());

        // Validate the Proprietari in the database
        List<Proprietari> proprietariList = proprietariRepository.findAll();
        assertThat(proprietariList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProprietari() throws Exception {
        int databaseSizeBeforeUpdate = proprietariRepository.findAll().size();
        proprietari.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProprietariMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(proprietari)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Proprietari in the database
        List<Proprietari> proprietariList = proprietariRepository.findAll();
        assertThat(proprietariList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProprietariWithPatch() throws Exception {
        // Initialize the database
        proprietariRepository.saveAndFlush(proprietari);

        int databaseSizeBeforeUpdate = proprietariRepository.findAll().size();

        // Update the proprietari using partial update
        Proprietari partialUpdatedProprietari = new Proprietari();
        partialUpdatedProprietari.setId(proprietari.getId());

        partialUpdatedProprietari
            .fizicJuridic(UPDATED_FIZIC_JURIDIC)
            .nume(UPDATED_NUME)
            .prenume(UPDATED_PRENUME)
            .tip(UPDATED_TIP)
            .numar(UPDATED_NUMAR)
            .denumireSocietate(UPDATED_DENUMIRE_SOCIETATE);

        restProprietariMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProprietari.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProprietari))
            )
            .andExpect(status().isOk());

        // Validate the Proprietari in the database
        List<Proprietari> proprietariList = proprietariRepository.findAll();
        assertThat(proprietariList).hasSize(databaseSizeBeforeUpdate);
        Proprietari testProprietari = proprietariList.get(proprietariList.size() - 1);
        assertThat(testProprietari.getFizicJuridic()).isEqualTo(UPDATED_FIZIC_JURIDIC);
        assertThat(testProprietari.getNume()).isEqualTo(UPDATED_NUME);
        assertThat(testProprietari.getPrenume()).isEqualTo(UPDATED_PRENUME);
        assertThat(testProprietari.getTip()).isEqualTo(UPDATED_TIP);
        assertThat(testProprietari.getSerie()).isEqualTo(DEFAULT_SERIE);
        assertThat(testProprietari.getNumar()).isEqualTo(UPDATED_NUMAR);
        assertThat(testProprietari.getCui()).isEqualTo(DEFAULT_CUI);
        assertThat(testProprietari.getDenumireSocietate()).isEqualTo(UPDATED_DENUMIRE_SOCIETATE);
    }

    @Test
    @Transactional
    void fullUpdateProprietariWithPatch() throws Exception {
        // Initialize the database
        proprietariRepository.saveAndFlush(proprietari);

        int databaseSizeBeforeUpdate = proprietariRepository.findAll().size();

        // Update the proprietari using partial update
        Proprietari partialUpdatedProprietari = new Proprietari();
        partialUpdatedProprietari.setId(proprietari.getId());

        partialUpdatedProprietari
            .fizicJuridic(UPDATED_FIZIC_JURIDIC)
            .nume(UPDATED_NUME)
            .prenume(UPDATED_PRENUME)
            .tip(UPDATED_TIP)
            .serie(UPDATED_SERIE)
            .numar(UPDATED_NUMAR)
            .cui(UPDATED_CUI)
            .denumireSocietate(UPDATED_DENUMIRE_SOCIETATE);

        restProprietariMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProprietari.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProprietari))
            )
            .andExpect(status().isOk());

        // Validate the Proprietari in the database
        List<Proprietari> proprietariList = proprietariRepository.findAll();
        assertThat(proprietariList).hasSize(databaseSizeBeforeUpdate);
        Proprietari testProprietari = proprietariList.get(proprietariList.size() - 1);
        assertThat(testProprietari.getFizicJuridic()).isEqualTo(UPDATED_FIZIC_JURIDIC);
        assertThat(testProprietari.getNume()).isEqualTo(UPDATED_NUME);
        assertThat(testProprietari.getPrenume()).isEqualTo(UPDATED_PRENUME);
        assertThat(testProprietari.getTip()).isEqualTo(UPDATED_TIP);
        assertThat(testProprietari.getSerie()).isEqualTo(UPDATED_SERIE);
        assertThat(testProprietari.getNumar()).isEqualTo(UPDATED_NUMAR);
        assertThat(testProprietari.getCui()).isEqualTo(UPDATED_CUI);
        assertThat(testProprietari.getDenumireSocietate()).isEqualTo(UPDATED_DENUMIRE_SOCIETATE);
    }

    @Test
    @Transactional
    void patchNonExistingProprietari() throws Exception {
        int databaseSizeBeforeUpdate = proprietariRepository.findAll().size();
        proprietari.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProprietariMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, proprietari.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(proprietari))
            )
            .andExpect(status().isBadRequest());

        // Validate the Proprietari in the database
        List<Proprietari> proprietariList = proprietariRepository.findAll();
        assertThat(proprietariList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProprietari() throws Exception {
        int databaseSizeBeforeUpdate = proprietariRepository.findAll().size();
        proprietari.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProprietariMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(proprietari))
            )
            .andExpect(status().isBadRequest());

        // Validate the Proprietari in the database
        List<Proprietari> proprietariList = proprietariRepository.findAll();
        assertThat(proprietariList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProprietari() throws Exception {
        int databaseSizeBeforeUpdate = proprietariRepository.findAll().size();
        proprietari.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProprietariMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(proprietari))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Proprietari in the database
        List<Proprietari> proprietariList = proprietariRepository.findAll();
        assertThat(proprietariList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProprietari() throws Exception {
        // Initialize the database
        proprietariRepository.saveAndFlush(proprietari);

        int databaseSizeBeforeDelete = proprietariRepository.findAll().size();

        // Delete the proprietari
        restProprietariMockMvc
            .perform(delete(ENTITY_API_URL_ID, proprietari.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Proprietari> proprietariList = proprietariRepository.findAll();
        assertThat(proprietariList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
