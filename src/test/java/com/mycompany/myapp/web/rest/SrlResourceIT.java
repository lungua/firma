package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Srl;
import com.mycompany.myapp.repository.SrlRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link SrlResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SrlResourceIT {

    private static final String DEFAULT_NUME_1 = "AAAAAAAAAA";
    private static final String UPDATED_NUME_1 = "BBBBBBBBBB";

    private static final String DEFAULT_NUME_2 = "AAAAAAAAAA";
    private static final String UPDATED_NUME_2 = "BBBBBBBBBB";

    private static final String DEFAULT_NUME_3 = "AAAAAAAAAA";
    private static final String UPDATED_NUME_3 = "BBBBBBBBBB";

    private static final String DEFAULT_NUME_SOCIETATE = "AAAAAAAAAA";
    private static final String UPDATED_NUME_SOCIETATE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_NUNE_FINAL = false;
    private static final Boolean UPDATED_NUNE_FINAL = true;

    private static final Instant DEFAULT_DATA_INREGISTRARE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_INREGISTRARE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_TELEFON = "AAAAAAAAAA";
    private static final String UPDATED_TELEFON = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SRL_FINALIZAT = false;
    private static final Boolean UPDATED_SRL_FINALIZAT = true;

    private static final String DEFAULT_LOGAT_CU = "AAAAAAAAAA";
    private static final String UPDATED_LOGAT_CU = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/srls";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SrlRepository srlRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSrlMockMvc;

    private Srl srl;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Srl createEntity(EntityManager em) {
        Srl srl = new Srl()
            .nume1(DEFAULT_NUME_1)
            .nume2(DEFAULT_NUME_2)
            .nume3(DEFAULT_NUME_3)
            .numeSocietate(DEFAULT_NUME_SOCIETATE)
            .nuneFinal(DEFAULT_NUNE_FINAL)
            .dataInregistrare(DEFAULT_DATA_INREGISTRARE)
            .telefon(DEFAULT_TELEFON)
            .email(DEFAULT_EMAIL)
            .srlFinalizat(DEFAULT_SRL_FINALIZAT)
            .logatCu(DEFAULT_LOGAT_CU);
        return srl;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Srl createUpdatedEntity(EntityManager em) {
        Srl srl = new Srl()
            .nume1(UPDATED_NUME_1)
            .nume2(UPDATED_NUME_2)
            .nume3(UPDATED_NUME_3)
            .numeSocietate(UPDATED_NUME_SOCIETATE)
            .nuneFinal(UPDATED_NUNE_FINAL)
            .dataInregistrare(UPDATED_DATA_INREGISTRARE)
            .telefon(UPDATED_TELEFON)
            .email(UPDATED_EMAIL)
            .srlFinalizat(UPDATED_SRL_FINALIZAT)
            .logatCu(UPDATED_LOGAT_CU);
        return srl;
    }

    @BeforeEach
    public void initTest() {
        srl = createEntity(em);
    }

    @Test
    @Transactional
    void createSrl() throws Exception {
        int databaseSizeBeforeCreate = srlRepository.findAll().size();
        // Create the Srl
        restSrlMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(srl)))
            .andExpect(status().isCreated());

        // Validate the Srl in the database
        List<Srl> srlList = srlRepository.findAll();
        assertThat(srlList).hasSize(databaseSizeBeforeCreate + 1);
        Srl testSrl = srlList.get(srlList.size() - 1);
        assertThat(testSrl.getNume1()).isEqualTo(DEFAULT_NUME_1);
        assertThat(testSrl.getNume2()).isEqualTo(DEFAULT_NUME_2);
        assertThat(testSrl.getNume3()).isEqualTo(DEFAULT_NUME_3);
        assertThat(testSrl.getNumeSocietate()).isEqualTo(DEFAULT_NUME_SOCIETATE);
        assertThat(testSrl.getNuneFinal()).isEqualTo(DEFAULT_NUNE_FINAL);
        assertThat(testSrl.getDataInregistrare()).isEqualTo(DEFAULT_DATA_INREGISTRARE);
        assertThat(testSrl.getTelefon()).isEqualTo(DEFAULT_TELEFON);
        assertThat(testSrl.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testSrl.getSrlFinalizat()).isEqualTo(DEFAULT_SRL_FINALIZAT);
        assertThat(testSrl.getLogatCu()).isEqualTo(DEFAULT_LOGAT_CU);
    }

    @Test
    @Transactional
    void createSrlWithExistingId() throws Exception {
        // Create the Srl with an existing ID
        srl.setId(1L);

        int databaseSizeBeforeCreate = srlRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSrlMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(srl)))
            .andExpect(status().isBadRequest());

        // Validate the Srl in the database
        List<Srl> srlList = srlRepository.findAll();
        assertThat(srlList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSrls() throws Exception {
        // Initialize the database
        srlRepository.saveAndFlush(srl);

        // Get all the srlList
        restSrlMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(srl.getId().intValue())))
            .andExpect(jsonPath("$.[*].nume1").value(hasItem(DEFAULT_NUME_1)))
            .andExpect(jsonPath("$.[*].nume2").value(hasItem(DEFAULT_NUME_2)))
            .andExpect(jsonPath("$.[*].nume3").value(hasItem(DEFAULT_NUME_3)))
            .andExpect(jsonPath("$.[*].numeSocietate").value(hasItem(DEFAULT_NUME_SOCIETATE)))
            .andExpect(jsonPath("$.[*].nuneFinal").value(hasItem(DEFAULT_NUNE_FINAL.booleanValue())))
            .andExpect(jsonPath("$.[*].dataInregistrare").value(hasItem(DEFAULT_DATA_INREGISTRARE.toString())))
            .andExpect(jsonPath("$.[*].telefon").value(hasItem(DEFAULT_TELEFON)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].srlFinalizat").value(hasItem(DEFAULT_SRL_FINALIZAT.booleanValue())))
            .andExpect(jsonPath("$.[*].logatCu").value(hasItem(DEFAULT_LOGAT_CU)));
    }

    @Test
    @Transactional
    void getSrl() throws Exception {
        // Initialize the database
        srlRepository.saveAndFlush(srl);

        // Get the srl
        restSrlMockMvc
            .perform(get(ENTITY_API_URL_ID, srl.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(srl.getId().intValue()))
            .andExpect(jsonPath("$.nume1").value(DEFAULT_NUME_1))
            .andExpect(jsonPath("$.nume2").value(DEFAULT_NUME_2))
            .andExpect(jsonPath("$.nume3").value(DEFAULT_NUME_3))
            .andExpect(jsonPath("$.numeSocietate").value(DEFAULT_NUME_SOCIETATE))
            .andExpect(jsonPath("$.nuneFinal").value(DEFAULT_NUNE_FINAL.booleanValue()))
            .andExpect(jsonPath("$.dataInregistrare").value(DEFAULT_DATA_INREGISTRARE.toString()))
            .andExpect(jsonPath("$.telefon").value(DEFAULT_TELEFON))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.srlFinalizat").value(DEFAULT_SRL_FINALIZAT.booleanValue()))
            .andExpect(jsonPath("$.logatCu").value(DEFAULT_LOGAT_CU));
    }

    @Test
    @Transactional
    void getNonExistingSrl() throws Exception {
        // Get the srl
        restSrlMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSrl() throws Exception {
        // Initialize the database
        srlRepository.saveAndFlush(srl);

        int databaseSizeBeforeUpdate = srlRepository.findAll().size();

        // Update the srl
        Srl updatedSrl = srlRepository.findById(srl.getId()).get();
        // Disconnect from session so that the updates on updatedSrl are not directly saved in db
        em.detach(updatedSrl);
        updatedSrl
            .nume1(UPDATED_NUME_1)
            .nume2(UPDATED_NUME_2)
            .nume3(UPDATED_NUME_3)
            .numeSocietate(UPDATED_NUME_SOCIETATE)
            .nuneFinal(UPDATED_NUNE_FINAL)
            .dataInregistrare(UPDATED_DATA_INREGISTRARE)
            .telefon(UPDATED_TELEFON)
            .email(UPDATED_EMAIL)
            .srlFinalizat(UPDATED_SRL_FINALIZAT)
            .logatCu(UPDATED_LOGAT_CU);

        restSrlMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSrl.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSrl))
            )
            .andExpect(status().isOk());

        // Validate the Srl in the database
        List<Srl> srlList = srlRepository.findAll();
        assertThat(srlList).hasSize(databaseSizeBeforeUpdate);
        Srl testSrl = srlList.get(srlList.size() - 1);
        assertThat(testSrl.getNume1()).isEqualTo(UPDATED_NUME_1);
        assertThat(testSrl.getNume2()).isEqualTo(UPDATED_NUME_2);
        assertThat(testSrl.getNume3()).isEqualTo(UPDATED_NUME_3);
        assertThat(testSrl.getNumeSocietate()).isEqualTo(UPDATED_NUME_SOCIETATE);
        assertThat(testSrl.getNuneFinal()).isEqualTo(UPDATED_NUNE_FINAL);
        assertThat(testSrl.getDataInregistrare()).isEqualTo(UPDATED_DATA_INREGISTRARE);
        assertThat(testSrl.getTelefon()).isEqualTo(UPDATED_TELEFON);
        assertThat(testSrl.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testSrl.getSrlFinalizat()).isEqualTo(UPDATED_SRL_FINALIZAT);
        assertThat(testSrl.getLogatCu()).isEqualTo(UPDATED_LOGAT_CU);
    }

    @Test
    @Transactional
    void putNonExistingSrl() throws Exception {
        int databaseSizeBeforeUpdate = srlRepository.findAll().size();
        srl.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSrlMockMvc
            .perform(
                put(ENTITY_API_URL_ID, srl.getId()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(srl))
            )
            .andExpect(status().isBadRequest());

        // Validate the Srl in the database
        List<Srl> srlList = srlRepository.findAll();
        assertThat(srlList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSrl() throws Exception {
        int databaseSizeBeforeUpdate = srlRepository.findAll().size();
        srl.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSrlMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(srl))
            )
            .andExpect(status().isBadRequest());

        // Validate the Srl in the database
        List<Srl> srlList = srlRepository.findAll();
        assertThat(srlList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSrl() throws Exception {
        int databaseSizeBeforeUpdate = srlRepository.findAll().size();
        srl.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSrlMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(srl)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Srl in the database
        List<Srl> srlList = srlRepository.findAll();
        assertThat(srlList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSrlWithPatch() throws Exception {
        // Initialize the database
        srlRepository.saveAndFlush(srl);

        int databaseSizeBeforeUpdate = srlRepository.findAll().size();

        // Update the srl using partial update
        Srl partialUpdatedSrl = new Srl();
        partialUpdatedSrl.setId(srl.getId());

        partialUpdatedSrl
            .nume1(UPDATED_NUME_1)
            .nume2(UPDATED_NUME_2)
            .numeSocietate(UPDATED_NUME_SOCIETATE)
            .dataInregistrare(UPDATED_DATA_INREGISTRARE)
            .srlFinalizat(UPDATED_SRL_FINALIZAT)
            .logatCu(UPDATED_LOGAT_CU);

        restSrlMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSrl.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSrl))
            )
            .andExpect(status().isOk());

        // Validate the Srl in the database
        List<Srl> srlList = srlRepository.findAll();
        assertThat(srlList).hasSize(databaseSizeBeforeUpdate);
        Srl testSrl = srlList.get(srlList.size() - 1);
        assertThat(testSrl.getNume1()).isEqualTo(UPDATED_NUME_1);
        assertThat(testSrl.getNume2()).isEqualTo(UPDATED_NUME_2);
        assertThat(testSrl.getNume3()).isEqualTo(DEFAULT_NUME_3);
        assertThat(testSrl.getNumeSocietate()).isEqualTo(UPDATED_NUME_SOCIETATE);
        assertThat(testSrl.getNuneFinal()).isEqualTo(DEFAULT_NUNE_FINAL);
        assertThat(testSrl.getDataInregistrare()).isEqualTo(UPDATED_DATA_INREGISTRARE);
        assertThat(testSrl.getTelefon()).isEqualTo(DEFAULT_TELEFON);
        assertThat(testSrl.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testSrl.getSrlFinalizat()).isEqualTo(UPDATED_SRL_FINALIZAT);
        assertThat(testSrl.getLogatCu()).isEqualTo(UPDATED_LOGAT_CU);
    }

    @Test
    @Transactional
    void fullUpdateSrlWithPatch() throws Exception {
        // Initialize the database
        srlRepository.saveAndFlush(srl);

        int databaseSizeBeforeUpdate = srlRepository.findAll().size();

        // Update the srl using partial update
        Srl partialUpdatedSrl = new Srl();
        partialUpdatedSrl.setId(srl.getId());

        partialUpdatedSrl
            .nume1(UPDATED_NUME_1)
            .nume2(UPDATED_NUME_2)
            .nume3(UPDATED_NUME_3)
            .numeSocietate(UPDATED_NUME_SOCIETATE)
            .nuneFinal(UPDATED_NUNE_FINAL)
            .dataInregistrare(UPDATED_DATA_INREGISTRARE)
            .telefon(UPDATED_TELEFON)
            .email(UPDATED_EMAIL)
            .srlFinalizat(UPDATED_SRL_FINALIZAT)
            .logatCu(UPDATED_LOGAT_CU);

        restSrlMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSrl.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSrl))
            )
            .andExpect(status().isOk());

        // Validate the Srl in the database
        List<Srl> srlList = srlRepository.findAll();
        assertThat(srlList).hasSize(databaseSizeBeforeUpdate);
        Srl testSrl = srlList.get(srlList.size() - 1);
        assertThat(testSrl.getNume1()).isEqualTo(UPDATED_NUME_1);
        assertThat(testSrl.getNume2()).isEqualTo(UPDATED_NUME_2);
        assertThat(testSrl.getNume3()).isEqualTo(UPDATED_NUME_3);
        assertThat(testSrl.getNumeSocietate()).isEqualTo(UPDATED_NUME_SOCIETATE);
        assertThat(testSrl.getNuneFinal()).isEqualTo(UPDATED_NUNE_FINAL);
        assertThat(testSrl.getDataInregistrare()).isEqualTo(UPDATED_DATA_INREGISTRARE);
        assertThat(testSrl.getTelefon()).isEqualTo(UPDATED_TELEFON);
        assertThat(testSrl.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testSrl.getSrlFinalizat()).isEqualTo(UPDATED_SRL_FINALIZAT);
        assertThat(testSrl.getLogatCu()).isEqualTo(UPDATED_LOGAT_CU);
    }

    @Test
    @Transactional
    void patchNonExistingSrl() throws Exception {
        int databaseSizeBeforeUpdate = srlRepository.findAll().size();
        srl.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSrlMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, srl.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(srl))
            )
            .andExpect(status().isBadRequest());

        // Validate the Srl in the database
        List<Srl> srlList = srlRepository.findAll();
        assertThat(srlList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSrl() throws Exception {
        int databaseSizeBeforeUpdate = srlRepository.findAll().size();
        srl.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSrlMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(srl))
            )
            .andExpect(status().isBadRequest());

        // Validate the Srl in the database
        List<Srl> srlList = srlRepository.findAll();
        assertThat(srlList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSrl() throws Exception {
        int databaseSizeBeforeUpdate = srlRepository.findAll().size();
        srl.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSrlMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(srl)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Srl in the database
        List<Srl> srlList = srlRepository.findAll();
        assertThat(srlList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSrl() throws Exception {
        // Initialize the database
        srlRepository.saveAndFlush(srl);

        int databaseSizeBeforeDelete = srlRepository.findAll().size();

        // Delete the srl
        restSrlMockMvc.perform(delete(ENTITY_API_URL_ID, srl.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Srl> srlList = srlRepository.findAll();
        assertThat(srlList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
