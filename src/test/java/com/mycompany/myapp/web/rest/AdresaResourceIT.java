package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Adresa;
import com.mycompany.myapp.repository.AdresaRepository;
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
 * Integration tests for the {@link AdresaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AdresaResourceIT {

    private static final String DEFAULT_STRADA = "AAAAAAAAAA";
    private static final String UPDATED_STRADA = "BBBBBBBBBB";

    private static final String DEFAULT_NUMARUL = "AAAAAAAAAA";
    private static final String UPDATED_NUMARUL = "BBBBBBBBBB";

    private static final String DEFAULT_LOCALITATEA = "AAAAAAAAAA";
    private static final String UPDATED_LOCALITATEA = "BBBBBBBBBB";

    private static final String DEFAULT_JUDETUL = "AAAAAAAAAA";
    private static final String UPDATED_JUDETUL = "BBBBBBBBBB";

    private static final String DEFAULT_BLOC = "AAAAAAAAAA";
    private static final String UPDATED_BLOC = "BBBBBBBBBB";

    private static final String DEFAULT_SCARA = "AAAAAAAAAA";
    private static final String UPDATED_SCARA = "BBBBBBBBBB";

    private static final String DEFAULT_ETAJ = "AAAAAAAAAA";
    private static final String UPDATED_ETAJ = "BBBBBBBBBB";

    private static final String DEFAULT_APARTAMENT = "AAAAAAAAAA";
    private static final String UPDATED_APARTAMENT = "BBBBBBBBBB";

    private static final String DEFAULT_ALTE_DETALII = "AAAAAAAAAA";
    private static final String UPDATED_ALTE_DETALII = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ASOCIATIE_LOCATARI = false;
    private static final Boolean UPDATED_ASOCIATIE_LOCATARI = true;

    private static final String ENTITY_API_URL = "/api/adresas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AdresaRepository adresaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAdresaMockMvc;

    private Adresa adresa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Adresa createEntity(EntityManager em) {
        Adresa adresa = new Adresa()
            .strada(DEFAULT_STRADA)
            .numarul(DEFAULT_NUMARUL)
            .localitatea(DEFAULT_LOCALITATEA)
            .judetul(DEFAULT_JUDETUL)
            .bloc(DEFAULT_BLOC)
            .scara(DEFAULT_SCARA)
            .etaj(DEFAULT_ETAJ)
            .apartament(DEFAULT_APARTAMENT)
            .alteDetalii(DEFAULT_ALTE_DETALII)
            .asociatieLocatari(DEFAULT_ASOCIATIE_LOCATARI);
        return adresa;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Adresa createUpdatedEntity(EntityManager em) {
        Adresa adresa = new Adresa()
            .strada(UPDATED_STRADA)
            .numarul(UPDATED_NUMARUL)
            .localitatea(UPDATED_LOCALITATEA)
            .judetul(UPDATED_JUDETUL)
            .bloc(UPDATED_BLOC)
            .scara(UPDATED_SCARA)
            .etaj(UPDATED_ETAJ)
            .apartament(UPDATED_APARTAMENT)
            .alteDetalii(UPDATED_ALTE_DETALII)
            .asociatieLocatari(UPDATED_ASOCIATIE_LOCATARI);
        return adresa;
    }

    @BeforeEach
    public void initTest() {
        adresa = createEntity(em);
    }

    @Test
    @Transactional
    void createAdresa() throws Exception {
        int databaseSizeBeforeCreate = adresaRepository.findAll().size();
        // Create the Adresa
        restAdresaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(adresa)))
            .andExpect(status().isCreated());

        // Validate the Adresa in the database
        List<Adresa> adresaList = adresaRepository.findAll();
        assertThat(adresaList).hasSize(databaseSizeBeforeCreate + 1);
        Adresa testAdresa = adresaList.get(adresaList.size() - 1);
        assertThat(testAdresa.getStrada()).isEqualTo(DEFAULT_STRADA);
        assertThat(testAdresa.getNumarul()).isEqualTo(DEFAULT_NUMARUL);
        assertThat(testAdresa.getLocalitatea()).isEqualTo(DEFAULT_LOCALITATEA);
        assertThat(testAdresa.getJudetul()).isEqualTo(DEFAULT_JUDETUL);
        assertThat(testAdresa.getBloc()).isEqualTo(DEFAULT_BLOC);
        assertThat(testAdresa.getScara()).isEqualTo(DEFAULT_SCARA);
        assertThat(testAdresa.getEtaj()).isEqualTo(DEFAULT_ETAJ);
        assertThat(testAdresa.getApartament()).isEqualTo(DEFAULT_APARTAMENT);
        assertThat(testAdresa.getAlteDetalii()).isEqualTo(DEFAULT_ALTE_DETALII);
        assertThat(testAdresa.getAsociatieLocatari()).isEqualTo(DEFAULT_ASOCIATIE_LOCATARI);
    }

    @Test
    @Transactional
    void createAdresaWithExistingId() throws Exception {
        // Create the Adresa with an existing ID
        adresa.setId(1L);

        int databaseSizeBeforeCreate = adresaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdresaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(adresa)))
            .andExpect(status().isBadRequest());

        // Validate the Adresa in the database
        List<Adresa> adresaList = adresaRepository.findAll();
        assertThat(adresaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAdresas() throws Exception {
        // Initialize the database
        adresaRepository.saveAndFlush(adresa);

        // Get all the adresaList
        restAdresaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(adresa.getId().intValue())))
            .andExpect(jsonPath("$.[*].strada").value(hasItem(DEFAULT_STRADA)))
            .andExpect(jsonPath("$.[*].numarul").value(hasItem(DEFAULT_NUMARUL)))
            .andExpect(jsonPath("$.[*].localitatea").value(hasItem(DEFAULT_LOCALITATEA)))
            .andExpect(jsonPath("$.[*].judetul").value(hasItem(DEFAULT_JUDETUL)))
            .andExpect(jsonPath("$.[*].bloc").value(hasItem(DEFAULT_BLOC)))
            .andExpect(jsonPath("$.[*].scara").value(hasItem(DEFAULT_SCARA)))
            .andExpect(jsonPath("$.[*].etaj").value(hasItem(DEFAULT_ETAJ)))
            .andExpect(jsonPath("$.[*].apartament").value(hasItem(DEFAULT_APARTAMENT)))
            .andExpect(jsonPath("$.[*].alteDetalii").value(hasItem(DEFAULT_ALTE_DETALII)))
            .andExpect(jsonPath("$.[*].asociatieLocatari").value(hasItem(DEFAULT_ASOCIATIE_LOCATARI.booleanValue())));
    }

    @Test
    @Transactional
    void getAdresa() throws Exception {
        // Initialize the database
        adresaRepository.saveAndFlush(adresa);

        // Get the adresa
        restAdresaMockMvc
            .perform(get(ENTITY_API_URL_ID, adresa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(adresa.getId().intValue()))
            .andExpect(jsonPath("$.strada").value(DEFAULT_STRADA))
            .andExpect(jsonPath("$.numarul").value(DEFAULT_NUMARUL))
            .andExpect(jsonPath("$.localitatea").value(DEFAULT_LOCALITATEA))
            .andExpect(jsonPath("$.judetul").value(DEFAULT_JUDETUL))
            .andExpect(jsonPath("$.bloc").value(DEFAULT_BLOC))
            .andExpect(jsonPath("$.scara").value(DEFAULT_SCARA))
            .andExpect(jsonPath("$.etaj").value(DEFAULT_ETAJ))
            .andExpect(jsonPath("$.apartament").value(DEFAULT_APARTAMENT))
            .andExpect(jsonPath("$.alteDetalii").value(DEFAULT_ALTE_DETALII))
            .andExpect(jsonPath("$.asociatieLocatari").value(DEFAULT_ASOCIATIE_LOCATARI.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingAdresa() throws Exception {
        // Get the adresa
        restAdresaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAdresa() throws Exception {
        // Initialize the database
        adresaRepository.saveAndFlush(adresa);

        int databaseSizeBeforeUpdate = adresaRepository.findAll().size();

        // Update the adresa
        Adresa updatedAdresa = adresaRepository.findById(adresa.getId()).get();
        // Disconnect from session so that the updates on updatedAdresa are not directly saved in db
        em.detach(updatedAdresa);
        updatedAdresa
            .strada(UPDATED_STRADA)
            .numarul(UPDATED_NUMARUL)
            .localitatea(UPDATED_LOCALITATEA)
            .judetul(UPDATED_JUDETUL)
            .bloc(UPDATED_BLOC)
            .scara(UPDATED_SCARA)
            .etaj(UPDATED_ETAJ)
            .apartament(UPDATED_APARTAMENT)
            .alteDetalii(UPDATED_ALTE_DETALII)
            .asociatieLocatari(UPDATED_ASOCIATIE_LOCATARI);

        restAdresaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAdresa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAdresa))
            )
            .andExpect(status().isOk());

        // Validate the Adresa in the database
        List<Adresa> adresaList = adresaRepository.findAll();
        assertThat(adresaList).hasSize(databaseSizeBeforeUpdate);
        Adresa testAdresa = adresaList.get(adresaList.size() - 1);
        assertThat(testAdresa.getStrada()).isEqualTo(UPDATED_STRADA);
        assertThat(testAdresa.getNumarul()).isEqualTo(UPDATED_NUMARUL);
        assertThat(testAdresa.getLocalitatea()).isEqualTo(UPDATED_LOCALITATEA);
        assertThat(testAdresa.getJudetul()).isEqualTo(UPDATED_JUDETUL);
        assertThat(testAdresa.getBloc()).isEqualTo(UPDATED_BLOC);
        assertThat(testAdresa.getScara()).isEqualTo(UPDATED_SCARA);
        assertThat(testAdresa.getEtaj()).isEqualTo(UPDATED_ETAJ);
        assertThat(testAdresa.getApartament()).isEqualTo(UPDATED_APARTAMENT);
        assertThat(testAdresa.getAlteDetalii()).isEqualTo(UPDATED_ALTE_DETALII);
        assertThat(testAdresa.getAsociatieLocatari()).isEqualTo(UPDATED_ASOCIATIE_LOCATARI);
    }

    @Test
    @Transactional
    void putNonExistingAdresa() throws Exception {
        int databaseSizeBeforeUpdate = adresaRepository.findAll().size();
        adresa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdresaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, adresa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(adresa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Adresa in the database
        List<Adresa> adresaList = adresaRepository.findAll();
        assertThat(adresaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAdresa() throws Exception {
        int databaseSizeBeforeUpdate = adresaRepository.findAll().size();
        adresa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdresaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(adresa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Adresa in the database
        List<Adresa> adresaList = adresaRepository.findAll();
        assertThat(adresaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAdresa() throws Exception {
        int databaseSizeBeforeUpdate = adresaRepository.findAll().size();
        adresa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdresaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(adresa)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Adresa in the database
        List<Adresa> adresaList = adresaRepository.findAll();
        assertThat(adresaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAdresaWithPatch() throws Exception {
        // Initialize the database
        adresaRepository.saveAndFlush(adresa);

        int databaseSizeBeforeUpdate = adresaRepository.findAll().size();

        // Update the adresa using partial update
        Adresa partialUpdatedAdresa = new Adresa();
        partialUpdatedAdresa.setId(adresa.getId());

        partialUpdatedAdresa
            .strada(UPDATED_STRADA)
            .localitatea(UPDATED_LOCALITATEA)
            .judetul(UPDATED_JUDETUL)
            .scara(UPDATED_SCARA)
            .apartament(UPDATED_APARTAMENT);

        restAdresaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAdresa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAdresa))
            )
            .andExpect(status().isOk());

        // Validate the Adresa in the database
        List<Adresa> adresaList = adresaRepository.findAll();
        assertThat(adresaList).hasSize(databaseSizeBeforeUpdate);
        Adresa testAdresa = adresaList.get(adresaList.size() - 1);
        assertThat(testAdresa.getStrada()).isEqualTo(UPDATED_STRADA);
        assertThat(testAdresa.getNumarul()).isEqualTo(DEFAULT_NUMARUL);
        assertThat(testAdresa.getLocalitatea()).isEqualTo(UPDATED_LOCALITATEA);
        assertThat(testAdresa.getJudetul()).isEqualTo(UPDATED_JUDETUL);
        assertThat(testAdresa.getBloc()).isEqualTo(DEFAULT_BLOC);
        assertThat(testAdresa.getScara()).isEqualTo(UPDATED_SCARA);
        assertThat(testAdresa.getEtaj()).isEqualTo(DEFAULT_ETAJ);
        assertThat(testAdresa.getApartament()).isEqualTo(UPDATED_APARTAMENT);
        assertThat(testAdresa.getAlteDetalii()).isEqualTo(DEFAULT_ALTE_DETALII);
        assertThat(testAdresa.getAsociatieLocatari()).isEqualTo(DEFAULT_ASOCIATIE_LOCATARI);
    }

    @Test
    @Transactional
    void fullUpdateAdresaWithPatch() throws Exception {
        // Initialize the database
        adresaRepository.saveAndFlush(adresa);

        int databaseSizeBeforeUpdate = adresaRepository.findAll().size();

        // Update the adresa using partial update
        Adresa partialUpdatedAdresa = new Adresa();
        partialUpdatedAdresa.setId(adresa.getId());

        partialUpdatedAdresa
            .strada(UPDATED_STRADA)
            .numarul(UPDATED_NUMARUL)
            .localitatea(UPDATED_LOCALITATEA)
            .judetul(UPDATED_JUDETUL)
            .bloc(UPDATED_BLOC)
            .scara(UPDATED_SCARA)
            .etaj(UPDATED_ETAJ)
            .apartament(UPDATED_APARTAMENT)
            .alteDetalii(UPDATED_ALTE_DETALII)
            .asociatieLocatari(UPDATED_ASOCIATIE_LOCATARI);

        restAdresaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAdresa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAdresa))
            )
            .andExpect(status().isOk());

        // Validate the Adresa in the database
        List<Adresa> adresaList = adresaRepository.findAll();
        assertThat(adresaList).hasSize(databaseSizeBeforeUpdate);
        Adresa testAdresa = adresaList.get(adresaList.size() - 1);
        assertThat(testAdresa.getStrada()).isEqualTo(UPDATED_STRADA);
        assertThat(testAdresa.getNumarul()).isEqualTo(UPDATED_NUMARUL);
        assertThat(testAdresa.getLocalitatea()).isEqualTo(UPDATED_LOCALITATEA);
        assertThat(testAdresa.getJudetul()).isEqualTo(UPDATED_JUDETUL);
        assertThat(testAdresa.getBloc()).isEqualTo(UPDATED_BLOC);
        assertThat(testAdresa.getScara()).isEqualTo(UPDATED_SCARA);
        assertThat(testAdresa.getEtaj()).isEqualTo(UPDATED_ETAJ);
        assertThat(testAdresa.getApartament()).isEqualTo(UPDATED_APARTAMENT);
        assertThat(testAdresa.getAlteDetalii()).isEqualTo(UPDATED_ALTE_DETALII);
        assertThat(testAdresa.getAsociatieLocatari()).isEqualTo(UPDATED_ASOCIATIE_LOCATARI);
    }

    @Test
    @Transactional
    void patchNonExistingAdresa() throws Exception {
        int databaseSizeBeforeUpdate = adresaRepository.findAll().size();
        adresa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdresaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, adresa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(adresa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Adresa in the database
        List<Adresa> adresaList = adresaRepository.findAll();
        assertThat(adresaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAdresa() throws Exception {
        int databaseSizeBeforeUpdate = adresaRepository.findAll().size();
        adresa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdresaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(adresa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Adresa in the database
        List<Adresa> adresaList = adresaRepository.findAll();
        assertThat(adresaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAdresa() throws Exception {
        int databaseSizeBeforeUpdate = adresaRepository.findAll().size();
        adresa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdresaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(adresa)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Adresa in the database
        List<Adresa> adresaList = adresaRepository.findAll();
        assertThat(adresaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAdresa() throws Exception {
        // Initialize the database
        adresaRepository.saveAndFlush(adresa);

        int databaseSizeBeforeDelete = adresaRepository.findAll().size();

        // Delete the adresa
        restAdresaMockMvc
            .perform(delete(ENTITY_API_URL_ID, adresa.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Adresa> adresaList = adresaRepository.findAll();
        assertThat(adresaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
