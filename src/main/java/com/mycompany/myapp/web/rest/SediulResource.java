package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Sediul;
import com.mycompany.myapp.repository.SediulRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Sediul}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SediulResource {

    private final Logger log = LoggerFactory.getLogger(SediulResource.class);

    private static final String ENTITY_NAME = "sediul";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SediulRepository sediulRepository;

    public SediulResource(SediulRepository sediulRepository) {
        this.sediulRepository = sediulRepository;
    }

    /**
     * {@code POST  /sediuls} : Create a new sediul.
     *
     * @param sediul the sediul to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sediul, or with status {@code 400 (Bad Request)} if the sediul has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sediuls")
    public ResponseEntity<Sediul> createSediul(@RequestBody Sediul sediul) throws URISyntaxException {
        log.debug("REST request to save Sediul : {}", sediul);
        if (sediul.getId() != null) {
            throw new BadRequestAlertException("A new sediul cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sediul result = sediulRepository.save(sediul);
        return ResponseEntity
            .created(new URI("/api/sediuls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sediuls/:id} : Updates an existing sediul.
     *
     * @param id the id of the sediul to save.
     * @param sediul the sediul to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sediul,
     * or with status {@code 400 (Bad Request)} if the sediul is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sediul couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sediuls/{id}")
    public ResponseEntity<Sediul> updateSediul(@PathVariable(value = "id", required = false) final Long id, @RequestBody Sediul sediul)
        throws URISyntaxException {
        log.debug("REST request to update Sediul : {}, {}", id, sediul);
        if (sediul.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sediul.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sediulRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Sediul result = sediulRepository.save(sediul);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sediul.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /sediuls/:id} : Partial updates given fields of an existing sediul, field will ignore if it is null
     *
     * @param id the id of the sediul to save.
     * @param sediul the sediul to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sediul,
     * or with status {@code 400 (Bad Request)} if the sediul is not valid,
     * or with status {@code 404 (Not Found)} if the sediul is not found,
     * or with status {@code 500 (Internal Server Error)} if the sediul couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/sediuls/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Sediul> partialUpdateSediul(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Sediul sediul
    ) throws URISyntaxException {
        log.debug("REST request to partial update Sediul partially : {}, {}", id, sediul);
        if (sediul.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sediul.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sediulRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Sediul> result = sediulRepository
            .findById(sediul.getId())
            .map(existingSediul -> {
                if (sediul.getSediusocialPunctLucru() != null) {
                    existingSediul.setSediusocialPunctLucru(sediul.getSediusocialPunctLucru());
                }

                return existingSediul;
            })
            .map(sediulRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sediul.getId().toString())
        );
    }

    /**
     * {@code GET  /sediuls} : get all the sediuls.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sediuls in body.
     */
    @GetMapping("/sediuls")
    public List<Sediul> getAllSediuls(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Sediuls");
        if (eagerload) {
            return sediulRepository.findAllWithEagerRelationships();
        } else {
            return sediulRepository.findAll();
        }
    }

    /**
     * {@code GET  /sediuls/:id} : get the "id" sediul.
     *
     * @param id the id of the sediul to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sediul, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sediuls/{id}")
    public ResponseEntity<Sediul> getSediul(@PathVariable Long id) {
        log.debug("REST request to get Sediul : {}", id);
        Optional<Sediul> sediul = sediulRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(sediul);
    }

    /**
     * {@code DELETE  /sediuls/:id} : delete the "id" sediul.
     *
     * @param id the id of the sediul to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sediuls/{id}")
    public ResponseEntity<Void> deleteSediul(@PathVariable Long id) {
        log.debug("REST request to delete Sediul : {}", id);
        sediulRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
