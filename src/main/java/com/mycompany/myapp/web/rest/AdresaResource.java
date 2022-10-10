package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Adresa;
import com.mycompany.myapp.repository.AdresaRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Adresa}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AdresaResource {

    private final Logger log = LoggerFactory.getLogger(AdresaResource.class);

    private static final String ENTITY_NAME = "adresa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdresaRepository adresaRepository;

    public AdresaResource(AdresaRepository adresaRepository) {
        this.adresaRepository = adresaRepository;
    }

    /**
     * {@code POST  /adresas} : Create a new adresa.
     *
     * @param adresa the adresa to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new adresa, or with status {@code 400 (Bad Request)} if the adresa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/adresas")
    public ResponseEntity<Adresa> createAdresa(@RequestBody Adresa adresa) throws URISyntaxException {
        log.debug("REST request to save Adresa : {}", adresa);
        if (adresa.getId() != null) {
            throw new BadRequestAlertException("A new adresa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Adresa result = adresaRepository.save(adresa);
        return ResponseEntity
            .created(new URI("/api/adresas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /adresas/:id} : Updates an existing adresa.
     *
     * @param id the id of the adresa to save.
     * @param adresa the adresa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated adresa,
     * or with status {@code 400 (Bad Request)} if the adresa is not valid,
     * or with status {@code 500 (Internal Server Error)} if the adresa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/adresas/{id}")
    public ResponseEntity<Adresa> updateAdresa(@PathVariable(value = "id", required = false) final Long id, @RequestBody Adresa adresa)
        throws URISyntaxException {
        log.debug("REST request to update Adresa : {}, {}", id, adresa);
        if (adresa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, adresa.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!adresaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Adresa result = adresaRepository.save(adresa);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, adresa.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /adresas/:id} : Partial updates given fields of an existing adresa, field will ignore if it is null
     *
     * @param id the id of the adresa to save.
     * @param adresa the adresa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated adresa,
     * or with status {@code 400 (Bad Request)} if the adresa is not valid,
     * or with status {@code 404 (Not Found)} if the adresa is not found,
     * or with status {@code 500 (Internal Server Error)} if the adresa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/adresas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Adresa> partialUpdateAdresa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Adresa adresa
    ) throws URISyntaxException {
        log.debug("REST request to partial update Adresa partially : {}, {}", id, adresa);
        if (adresa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, adresa.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!adresaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Adresa> result = adresaRepository
            .findById(adresa.getId())
            .map(existingAdresa -> {
                if (adresa.getStrada() != null) {
                    existingAdresa.setStrada(adresa.getStrada());
                }
                if (adresa.getNumarul() != null) {
                    existingAdresa.setNumarul(adresa.getNumarul());
                }
                if (adresa.getLocalitatea() != null) {
                    existingAdresa.setLocalitatea(adresa.getLocalitatea());
                }
                if (adresa.getJudetul() != null) {
                    existingAdresa.setJudetul(adresa.getJudetul());
                }
                if (adresa.getBloc() != null) {
                    existingAdresa.setBloc(adresa.getBloc());
                }
                if (adresa.getScara() != null) {
                    existingAdresa.setScara(adresa.getScara());
                }
                if (adresa.getEtaj() != null) {
                    existingAdresa.setEtaj(adresa.getEtaj());
                }
                if (adresa.getApartament() != null) {
                    existingAdresa.setApartament(adresa.getApartament());
                }
                if (adresa.getAlteDetalii() != null) {
                    existingAdresa.setAlteDetalii(adresa.getAlteDetalii());
                }
                if (adresa.getAsociatieLocatari() != null) {
                    existingAdresa.setAsociatieLocatari(adresa.getAsociatieLocatari());
                }

                return existingAdresa;
            })
            .map(adresaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, adresa.getId().toString())
        );
    }

    /**
     * {@code GET  /adresas} : get all the adresas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of adresas in body.
     */
    @GetMapping("/adresas")
    public List<Adresa> getAllAdresas() {
        log.debug("REST request to get all Adresas");
        return adresaRepository.findAll();
    }

    /**
     * {@code GET  /adresas/:id} : get the "id" adresa.
     *
     * @param id the id of the adresa to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the adresa, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/adresas/{id}")
    public ResponseEntity<Adresa> getAdresa(@PathVariable Long id) {
        log.debug("REST request to get Adresa : {}", id);
        Optional<Adresa> adresa = adresaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(adresa);
    }

    /**
     * {@code DELETE  /adresas/:id} : delete the "id" adresa.
     *
     * @param id the id of the adresa to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/adresas/{id}")
    public ResponseEntity<Void> deleteAdresa(@PathVariable Long id) {
        log.debug("REST request to delete Adresa : {}", id);
        adresaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
