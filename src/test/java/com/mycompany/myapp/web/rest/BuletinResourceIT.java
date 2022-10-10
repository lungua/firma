package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Buletin;
import com.mycompany.myapp.repository.BuletinRepository;
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
 * Integration tests for the {@link BuletinResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BuletinResourceIT {

    private static final String DEFAULT_TIP = "AAAAAAAAAA";
    private static final String UPDATED_TIP = "BBBBBBBBBB";

    private static final String DEFAULT_SERIE = "AAAAAAAAAA";
    private static final String UPDATED_SERIE = "BBBBBBBBBB";

    private static final String DEFAULT_NUMAR = "AAAAAAAAAA";
    private static final String UPDATED_NUMAR = "BBBBBBBBBB";

    private static final String DEFAULT_CNP = "AAAAAAAAAA";
    private static final String UPDATED_CNP = "BBBBBBBBBB";

    private static final String DEFAULT_TARA = "AAAAAAAAAA";
    private static final String UPDATED_TARA = "BBBBBBBBBB";

    private static final String DEFAULT_JUDET = "AAAAAAAAAA";
    private static final String UPDATED_JUDET = "BBBBBBBBBB";

    private static final String DEFAULT_LOCALITATE = "AAAAAAAAAA";
    private static final String UPDATED_LOCALITATE = "BBBBBBBBBB";

    private static final String DEFAULT_CETATENIE = "AAAAAAAAAA";
    private static final String UPDATED_CETATENIE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ELIBERAT_DE = "AAAAAAAAAA";
    private static final String UPDATED_ELIBERAT_DE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/buletins";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private BuletinRepository buletinRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBuletinMockMvc;

    private Buletin buletin;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Buletin createEntity(EntityManager em) {
        Buletin buletin = new Buletin()
            .tip(DEFAULT_TIP)
            .serie(DEFAULT_SERIE)
            .numar(DEFAULT_NUMAR)
            .cnp(DEFAULT_CNP)
            .tara(DEFAULT_TARA)
            .judet(DEFAULT_JUDET)
            .localitate(DEFAULT_LOCALITATE)
            .cetatenie(DEFAULT_CETATENIE)
            .data(DEFAULT_DATA)
            .eliberatDe(DEFAULT_ELIBERAT_DE);
        return buletin;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Buletin createUpdatedEntity(EntityManager em) {
        Buletin buletin = new Buletin()
            .tip(UPDATED_TIP)
            .serie(UPDATED_SERIE)
            .numar(UPDATED_NUMAR)
            .cnp(UPDATED_CNP)
            .tara(UPDATED_TARA)
            .judet(UPDATED_JUDET)
            .localitate(UPDATED_LOCALITATE)
            .cetatenie(UPDATED_CETATENIE)
            .data(UPDATED_DATA)
            .eliberatDe(UPDATED_ELIBERAT_DE);
        return buletin;
    }

    @BeforeEach
    public void initTest() {
        buletin = createEntity(em);
    }

    @Test
    @Transactional
    void createBuletin() throws Exception {
        int databaseSizeBeforeCreate = buletinRepository.findAll().size();
        // Create the Buletin
        restBuletinMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(buletin)))
            .andExpect(status().isCreated());

        // Validate the Buletin in the database
        List<Buletin> buletinList = buletinRepository.findAll();
        assertThat(buletinList).hasSize(databaseSizeBeforeCreate + 1);
        Buletin testBuletin = buletinList.get(buletinList.size() - 1);
        assertThat(testBuletin.getTip()).isEqualTo(DEFAULT_TIP);
        assertThat(testBuletin.getSerie()).isEqualTo(DEFAULT_SERIE);
        assertThat(testBuletin.getNumar()).isEqualTo(DEFAULT_NUMAR);
        assertThat(testBuletin.getCnp()).isEqualTo(DEFAULT_CNP);
        assertThat(testBuletin.getTara()).isEqualTo(DEFAULT_TARA);
        assertThat(testBuletin.getJudet()).isEqualTo(DEFAULT_JUDET);
        assertThat(testBuletin.getLocalitate()).isEqualTo(DEFAULT_LOCALITATE);
        assertThat(testBuletin.getCetatenie()).isEqualTo(DEFAULT_CETATENIE);
        assertThat(testBuletin.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testBuletin.getEliberatDe()).isEqualTo(DEFAULT_ELIBERAT_DE);
    }

    @Test
    @Transactional
    void createBuletinWithExistingId() throws Exception {
        // Create the Buletin with an existing ID
        buletin.setId(1L);

        int databaseSizeBeforeCreate = buletinRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBuletinMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(buletin)))
            .andExpect(status().isBadRequest());

        // Validate the Buletin in the database
        List<Buletin> buletinList = buletinRepository.findAll();
        assertThat(buletinList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBuletins() throws Exception {
        // Initialize the database
        buletinRepository.saveAndFlush(buletin);

        // Get all the buletinList
        restBuletinMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(buletin.getId().intValue())))
            .andExpect(jsonPath("$.[*].tip").value(hasItem(DEFAULT_TIP)))
            .andExpect(jsonPath("$.[*].serie").value(hasItem(DEFAULT_SERIE)))
            .andExpect(jsonPath("$.[*].numar").value(hasItem(DEFAULT_NUMAR)))
            .andExpect(jsonPath("$.[*].cnp").value(hasItem(DEFAULT_CNP)))
            .andExpect(jsonPath("$.[*].tara").value(hasItem(DEFAULT_TARA)))
            .andExpect(jsonPath("$.[*].judet").value(hasItem(DEFAULT_JUDET)))
            .andExpect(jsonPath("$.[*].localitate").value(hasItem(DEFAULT_LOCALITATE)))
            .andExpect(jsonPath("$.[*].cetatenie").value(hasItem(DEFAULT_CETATENIE)))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].eliberatDe").value(hasItem(DEFAULT_ELIBERAT_DE)));
    }

    @Test
    @Transactional
    void getBuletin() throws Exception {
        // Initialize the database
        buletinRepository.saveAndFlush(buletin);

        // Get the buletin
        restBuletinMockMvc
            .perform(get(ENTITY_API_URL_ID, buletin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(buletin.getId().intValue()))
            .andExpect(jsonPath("$.tip").value(DEFAULT_TIP))
            .andExpect(jsonPath("$.serie").value(DEFAULT_SERIE))
            .andExpect(jsonPath("$.numar").value(DEFAULT_NUMAR))
            .andExpect(jsonPath("$.cnp").value(DEFAULT_CNP))
            .andExpect(jsonPath("$.tara").value(DEFAULT_TARA))
            .andExpect(jsonPath("$.judet").value(DEFAULT_JUDET))
            .andExpect(jsonPath("$.localitate").value(DEFAULT_LOCALITATE))
            .andExpect(jsonPath("$.cetatenie").value(DEFAULT_CETATENIE))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.eliberatDe").value(DEFAULT_ELIBERAT_DE));
    }

    @Test
    @Transactional
    void getNonExistingBuletin() throws Exception {
        // Get the buletin
        restBuletinMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingBuletin() throws Exception {
        // Initialize the database
        buletinRepository.saveAndFlush(buletin);

        int databaseSizeBeforeUpdate = buletinRepository.findAll().size();

        // Update the buletin
        Buletin updatedBuletin = buletinRepository.findById(buletin.getId()).get();
        // Disconnect from session so that the updates on updatedBuletin are not directly saved in db
        em.detach(updatedBuletin);
        updatedBuletin
            .tip(UPDATED_TIP)
            .serie(UPDATED_SERIE)
            .numar(UPDATED_NUMAR)
            .cnp(UPDATED_CNP)
            .tara(UPDATED_TARA)
            .judet(UPDATED_JUDET)
            .localitate(UPDATED_LOCALITATE)
            .cetatenie(UPDATED_CETATENIE)
            .data(UPDATED_DATA)
            .eliberatDe(UPDATED_ELIBERAT_DE);

        restBuletinMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBuletin.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBuletin))
            )
            .andExpect(status().isOk());

        // Validate the Buletin in the database
        List<Buletin> buletinList = buletinRepository.findAll();
        assertThat(buletinList).hasSize(databaseSizeBeforeUpdate);
        Buletin testBuletin = buletinList.get(buletinList.size() - 1);
        assertThat(testBuletin.getTip()).isEqualTo(UPDATED_TIP);
        assertThat(testBuletin.getSerie()).isEqualTo(UPDATED_SERIE);
        assertThat(testBuletin.getNumar()).isEqualTo(UPDATED_NUMAR);
        assertThat(testBuletin.getCnp()).isEqualTo(UPDATED_CNP);
        assertThat(testBuletin.getTara()).isEqualTo(UPDATED_TARA);
        assertThat(testBuletin.getJudet()).isEqualTo(UPDATED_JUDET);
        assertThat(testBuletin.getLocalitate()).isEqualTo(UPDATED_LOCALITATE);
        assertThat(testBuletin.getCetatenie()).isEqualTo(UPDATED_CETATENIE);
        assertThat(testBuletin.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testBuletin.getEliberatDe()).isEqualTo(UPDATED_ELIBERAT_DE);
    }

    @Test
    @Transactional
    void putNonExistingBuletin() throws Exception {
        int databaseSizeBeforeUpdate = buletinRepository.findAll().size();
        buletin.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBuletinMockMvc
            .perform(
                put(ENTITY_API_URL_ID, buletin.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(buletin))
            )
            .andExpect(status().isBadRequest());

        // Validate the Buletin in the database
        List<Buletin> buletinList = buletinRepository.findAll();
        assertThat(buletinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBuletin() throws Exception {
        int databaseSizeBeforeUpdate = buletinRepository.findAll().size();
        buletin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBuletinMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(buletin))
            )
            .andExpect(status().isBadRequest());

        // Validate the Buletin in the database
        List<Buletin> buletinList = buletinRepository.findAll();
        assertThat(buletinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBuletin() throws Exception {
        int databaseSizeBeforeUpdate = buletinRepository.findAll().size();
        buletin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBuletinMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(buletin)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Buletin in the database
        List<Buletin> buletinList = buletinRepository.findAll();
        assertThat(buletinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBuletinWithPatch() throws Exception {
        // Initialize the database
        buletinRepository.saveAndFlush(buletin);

        int databaseSizeBeforeUpdate = buletinRepository.findAll().size();

        // Update the buletin using partial update
        Buletin partialUpdatedBuletin = new Buletin();
        partialUpdatedBuletin.setId(buletin.getId());

        partialUpdatedBuletin
            .serie(UPDATED_SERIE)
            .numar(UPDATED_NUMAR)
            .tara(UPDATED_TARA)
            .cetatenie(UPDATED_CETATENIE)
            .data(UPDATED_DATA)
            .eliberatDe(UPDATED_ELIBERAT_DE);

        restBuletinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBuletin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBuletin))
            )
            .andExpect(status().isOk());

        // Validate the Buletin in the database
        List<Buletin> buletinList = buletinRepository.findAll();
        assertThat(buletinList).hasSize(databaseSizeBeforeUpdate);
        Buletin testBuletin = buletinList.get(buletinList.size() - 1);
        assertThat(testBuletin.getTip()).isEqualTo(DEFAULT_TIP);
        assertThat(testBuletin.getSerie()).isEqualTo(UPDATED_SERIE);
        assertThat(testBuletin.getNumar()).isEqualTo(UPDATED_NUMAR);
        assertThat(testBuletin.getCnp()).isEqualTo(DEFAULT_CNP);
        assertThat(testBuletin.getTara()).isEqualTo(UPDATED_TARA);
        assertThat(testBuletin.getJudet()).isEqualTo(DEFAULT_JUDET);
        assertThat(testBuletin.getLocalitate()).isEqualTo(DEFAULT_LOCALITATE);
        assertThat(testBuletin.getCetatenie()).isEqualTo(UPDATED_CETATENIE);
        assertThat(testBuletin.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testBuletin.getEliberatDe()).isEqualTo(UPDATED_ELIBERAT_DE);
    }

    @Test
    @Transactional
    void fullUpdateBuletinWithPatch() throws Exception {
        // Initialize the database
        buletinRepository.saveAndFlush(buletin);

        int databaseSizeBeforeUpdate = buletinRepository.findAll().size();

        // Update the buletin using partial update
        Buletin partialUpdatedBuletin = new Buletin();
        partialUpdatedBuletin.setId(buletin.getId());

        partialUpdatedBuletin
            .tip(UPDATED_TIP)
            .serie(UPDATED_SERIE)
            .numar(UPDATED_NUMAR)
            .cnp(UPDATED_CNP)
            .tara(UPDATED_TARA)
            .judet(UPDATED_JUDET)
            .localitate(UPDATED_LOCALITATE)
            .cetatenie(UPDATED_CETATENIE)
            .data(UPDATED_DATA)
            .eliberatDe(UPDATED_ELIBERAT_DE);

        restBuletinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBuletin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedBuletin))
            )
            .andExpect(status().isOk());

        // Validate the Buletin in the database
        List<Buletin> buletinList = buletinRepository.findAll();
        assertThat(buletinList).hasSize(databaseSizeBeforeUpdate);
        Buletin testBuletin = buletinList.get(buletinList.size() - 1);
        assertThat(testBuletin.getTip()).isEqualTo(UPDATED_TIP);
        assertThat(testBuletin.getSerie()).isEqualTo(UPDATED_SERIE);
        assertThat(testBuletin.getNumar()).isEqualTo(UPDATED_NUMAR);
        assertThat(testBuletin.getCnp()).isEqualTo(UPDATED_CNP);
        assertThat(testBuletin.getTara()).isEqualTo(UPDATED_TARA);
        assertThat(testBuletin.getJudet()).isEqualTo(UPDATED_JUDET);
        assertThat(testBuletin.getLocalitate()).isEqualTo(UPDATED_LOCALITATE);
        assertThat(testBuletin.getCetatenie()).isEqualTo(UPDATED_CETATENIE);
        assertThat(testBuletin.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testBuletin.getEliberatDe()).isEqualTo(UPDATED_ELIBERAT_DE);
    }

    @Test
    @Transactional
    void patchNonExistingBuletin() throws Exception {
        int databaseSizeBeforeUpdate = buletinRepository.findAll().size();
        buletin.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBuletinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, buletin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(buletin))
            )
            .andExpect(status().isBadRequest());

        // Validate the Buletin in the database
        List<Buletin> buletinList = buletinRepository.findAll();
        assertThat(buletinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBuletin() throws Exception {
        int databaseSizeBeforeUpdate = buletinRepository.findAll().size();
        buletin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBuletinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(buletin))
            )
            .andExpect(status().isBadRequest());

        // Validate the Buletin in the database
        List<Buletin> buletinList = buletinRepository.findAll();
        assertThat(buletinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBuletin() throws Exception {
        int databaseSizeBeforeUpdate = buletinRepository.findAll().size();
        buletin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBuletinMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(buletin)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Buletin in the database
        List<Buletin> buletinList = buletinRepository.findAll();
        assertThat(buletinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBuletin() throws Exception {
        // Initialize the database
        buletinRepository.saveAndFlush(buletin);

        int databaseSizeBeforeDelete = buletinRepository.findAll().size();

        // Delete the buletin
        restBuletinMockMvc
            .perform(delete(ENTITY_API_URL_ID, buletin.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Buletin> buletinList = buletinRepository.findAll();
        assertThat(buletinList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
