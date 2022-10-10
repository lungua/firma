package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.SumaIncasata;
import com.mycompany.myapp.repository.SumaIncasataRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.SumaIncasata}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SumaIncasataResource {

    private final Logger log = LoggerFactory.getLogger(SumaIncasataResource.class);

    private static final String ENTITY_NAME = "sumaIncasata";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SumaIncasataRepository sumaIncasataRepository;

    public SumaIncasataResource(SumaIncasataRepository sumaIncasataRepository) {
        this.sumaIncasataRepository = sumaIncasataRepository;
    }

    /**
     * {@code POST  /suma-incasatas} : Create a new sumaIncasata.
     *
     * @param sumaIncasata the sumaIncasata to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sumaIncasata, or with status {@code 400 (Bad Request)} if the sumaIncasata has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/suma-incasatas")
    public ResponseEntity<SumaIncasata> createSumaIncasata(@RequestBody SumaIncasata sumaIncasata) throws URISyntaxException {
        log.debug("REST request to save SumaIncasata : {}", sumaIncasata);
        if (sumaIncasata.getId() != null) {
            throw new BadRequestAlertException("A new sumaIncasata cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SumaIncasata result = sumaIncasataRepository.save(sumaIncasata);
        return ResponseEntity
            .created(new URI("/api/suma-incasatas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /suma-incasatas/:id} : Updates an existing sumaIncasata.
     *
     * @param id the id of the sumaIncasata to save.
     * @param sumaIncasata the sumaIncasata to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sumaIncasata,
     * or with status {@code 400 (Bad Request)} if the sumaIncasata is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sumaIncasata couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/suma-incasatas/{id}")
    public ResponseEntity<SumaIncasata> updateSumaIncasata(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SumaIncasata sumaIncasata
    ) throws URISyntaxException {
        log.debug("REST request to update SumaIncasata : {}, {}", id, sumaIncasata);
        if (sumaIncasata.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sumaIncasata.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sumaIncasataRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SumaIncasata result = sumaIncasataRepository.save(sumaIncasata);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sumaIncasata.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /suma-incasatas/:id} : Partial updates given fields of an existing sumaIncasata, field will ignore if it is null
     *
     * @param id the id of the sumaIncasata to save.
     * @param sumaIncasata the sumaIncasata to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sumaIncasata,
     * or with status {@code 400 (Bad Request)} if the sumaIncasata is not valid,
     * or with status {@code 404 (Not Found)} if the sumaIncasata is not found,
     * or with status {@code 500 (Internal Server Error)} if the sumaIncasata couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/suma-incasatas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SumaIncasata> partialUpdateSumaIncasata(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SumaIncasata sumaIncasata
    ) throws URISyntaxException {
        log.debug("REST request to partial update SumaIncasata partially : {}, {}", id, sumaIncasata);
        if (sumaIncasata.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sumaIncasata.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sumaIncasataRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SumaIncasata> result = sumaIncasataRepository
            .findById(sumaIncasata.getId())
            .map(existingSumaIncasata -> {
                if (sumaIncasata.getSumaIncasata() != null) {
                    existingSumaIncasata.setSumaIncasata(sumaIncasata.getSumaIncasata());
                }
                if (sumaIncasata.getDataIncasarii() != null) {
                    existingSumaIncasata.setDataIncasarii(sumaIncasata.getDataIncasarii());
                }

                return existingSumaIncasata;
            })
            .map(sumaIncasataRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sumaIncasata.getId().toString())
        );
    }

    /**
     * {@code GET  /suma-incasatas} : get all the sumaIncasatas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sumaIncasatas in body.
     */
    @GetMapping("/suma-incasatas")
    public List<SumaIncasata> getAllSumaIncasatas() {
        log.debug("REST request to get all SumaIncasatas");
        return sumaIncasataRepository.findAll();
    }

    /**
     * {@code GET  /suma-incasatas/:id} : get the "id" sumaIncasata.
     *
     * @param id the id of the sumaIncasata to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sumaIncasata, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/suma-incasatas/{id}")
    public ResponseEntity<SumaIncasata> getSumaIncasata(@PathVariable Long id) {
        log.debug("REST request to get SumaIncasata : {}", id);
        Optional<SumaIncasata> sumaIncasata = sumaIncasataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sumaIncasata);
    }

    /**
     * {@code DELETE  /suma-incasatas/:id} : delete the "id" sumaIncasata.
     *
     * @param id the id of the sumaIncasata to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/suma-incasatas/{id}")
    public ResponseEntity<Void> deleteSumaIncasata(@PathVariable Long id) {
        log.debug("REST request to delete SumaIncasata : {}", id);
        sumaIncasataRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
