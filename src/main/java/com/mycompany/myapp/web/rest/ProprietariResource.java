package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Proprietari;
import com.mycompany.myapp.repository.ProprietariRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Proprietari}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProprietariResource {

    private final Logger log = LoggerFactory.getLogger(ProprietariResource.class);

    private static final String ENTITY_NAME = "proprietari";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProprietariRepository proprietariRepository;

    public ProprietariResource(ProprietariRepository proprietariRepository) {
        this.proprietariRepository = proprietariRepository;
    }

    /**
     * {@code POST  /proprietaris} : Create a new proprietari.
     *
     * @param proprietari the proprietari to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proprietari, or with status {@code 400 (Bad Request)} if the proprietari has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/proprietaris")
    public ResponseEntity<Proprietari> createProprietari(@RequestBody Proprietari proprietari) throws URISyntaxException {
        log.debug("REST request to save Proprietari : {}", proprietari);
        if (proprietari.getId() != null) {
            throw new BadRequestAlertException("A new proprietari cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Proprietari result = proprietariRepository.save(proprietari);
        return ResponseEntity
            .created(new URI("/api/proprietaris/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /proprietaris/:id} : Updates an existing proprietari.
     *
     * @param id the id of the proprietari to save.
     * @param proprietari the proprietari to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proprietari,
     * or with status {@code 400 (Bad Request)} if the proprietari is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proprietari couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/proprietaris/{id}")
    public ResponseEntity<Proprietari> updateProprietari(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Proprietari proprietari
    ) throws URISyntaxException {
        log.debug("REST request to update Proprietari : {}, {}", id, proprietari);
        if (proprietari.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, proprietari.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proprietariRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Proprietari result = proprietariRepository.save(proprietari);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, proprietari.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /proprietaris/:id} : Partial updates given fields of an existing proprietari, field will ignore if it is null
     *
     * @param id the id of the proprietari to save.
     * @param proprietari the proprietari to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proprietari,
     * or with status {@code 400 (Bad Request)} if the proprietari is not valid,
     * or with status {@code 404 (Not Found)} if the proprietari is not found,
     * or with status {@code 500 (Internal Server Error)} if the proprietari couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/proprietaris/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Proprietari> partialUpdateProprietari(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Proprietari proprietari
    ) throws URISyntaxException {
        log.debug("REST request to partial update Proprietari partially : {}, {}", id, proprietari);
        if (proprietari.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, proprietari.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proprietariRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Proprietari> result = proprietariRepository
            .findById(proprietari.getId())
            .map(existingProprietari -> {
                if (proprietari.getFizicJuridic() != null) {
                    existingProprietari.setFizicJuridic(proprietari.getFizicJuridic());
                }
                if (proprietari.getNume() != null) {
                    existingProprietari.setNume(proprietari.getNume());
                }
                if (proprietari.getPrenume() != null) {
                    existingProprietari.setPrenume(proprietari.getPrenume());
                }
                if (proprietari.getTip() != null) {
                    existingProprietari.setTip(proprietari.getTip());
                }
                if (proprietari.getSerie() != null) {
                    existingProprietari.setSerie(proprietari.getSerie());
                }
                if (proprietari.getNumar() != null) {
                    existingProprietari.setNumar(proprietari.getNumar());
                }
                if (proprietari.getCui() != null) {
                    existingProprietari.setCui(proprietari.getCui());
                }
                if (proprietari.getDenumireSocietate() != null) {
                    existingProprietari.setDenumireSocietate(proprietari.getDenumireSocietate());
                }

                return existingProprietari;
            })
            .map(proprietariRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, proprietari.getId().toString())
        );
    }

    /**
     * {@code GET  /proprietaris} : get all the proprietaris.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of proprietaris in body.
     */
    @GetMapping("/proprietaris")
    public List<Proprietari> getAllProprietaris() {
        log.debug("REST request to get all Proprietaris");
        return proprietariRepository.findAll();
    }

    /**
     * {@code GET  /proprietaris/:id} : get the "id" proprietari.
     *
     * @param id the id of the proprietari to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proprietari, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/proprietaris/{id}")
    public ResponseEntity<Proprietari> getProprietari(@PathVariable Long id) {
        log.debug("REST request to get Proprietari : {}", id);
        Optional<Proprietari> proprietari = proprietariRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(proprietari);
    }

    /**
     * {@code DELETE  /proprietaris/:id} : delete the "id" proprietari.
     *
     * @param id the id of the proprietari to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/proprietaris/{id}")
    public ResponseEntity<Void> deleteProprietari(@PathVariable Long id) {
        log.debug("REST request to delete Proprietari : {}", id);
        proprietariRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
