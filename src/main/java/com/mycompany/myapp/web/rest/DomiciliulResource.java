package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Domiciliul;
import com.mycompany.myapp.repository.DomiciliulRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Domiciliul}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DomiciliulResource {

    private final Logger log = LoggerFactory.getLogger(DomiciliulResource.class);

    private static final String ENTITY_NAME = "domiciliul";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DomiciliulRepository domiciliulRepository;

    public DomiciliulResource(DomiciliulRepository domiciliulRepository) {
        this.domiciliulRepository = domiciliulRepository;
    }

    /**
     * {@code POST  /domiciliuls} : Create a new domiciliul.
     *
     * @param domiciliul the domiciliul to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new domiciliul, or with status {@code 400 (Bad Request)} if the domiciliul has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/domiciliuls")
    public ResponseEntity<Domiciliul> createDomiciliul(@RequestBody Domiciliul domiciliul) throws URISyntaxException {
        log.debug("REST request to save Domiciliul : {}", domiciliul);
        if (domiciliul.getId() != null) {
            throw new BadRequestAlertException("A new domiciliul cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Domiciliul result = domiciliulRepository.save(domiciliul);
        return ResponseEntity
            .created(new URI("/api/domiciliuls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /domiciliuls/:id} : Updates an existing domiciliul.
     *
     * @param id the id of the domiciliul to save.
     * @param domiciliul the domiciliul to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated domiciliul,
     * or with status {@code 400 (Bad Request)} if the domiciliul is not valid,
     * or with status {@code 500 (Internal Server Error)} if the domiciliul couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/domiciliuls/{id}")
    public ResponseEntity<Domiciliul> updateDomiciliul(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Domiciliul domiciliul
    ) throws URISyntaxException {
        log.debug("REST request to update Domiciliul : {}, {}", id, domiciliul);
        if (domiciliul.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, domiciliul.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!domiciliulRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Domiciliul result = domiciliulRepository.save(domiciliul);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, domiciliul.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /domiciliuls/:id} : Partial updates given fields of an existing domiciliul, field will ignore if it is null
     *
     * @param id the id of the domiciliul to save.
     * @param domiciliul the domiciliul to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated domiciliul,
     * or with status {@code 400 (Bad Request)} if the domiciliul is not valid,
     * or with status {@code 404 (Not Found)} if the domiciliul is not found,
     * or with status {@code 500 (Internal Server Error)} if the domiciliul couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/domiciliuls/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Domiciliul> partialUpdateDomiciliul(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Domiciliul domiciliul
    ) throws URISyntaxException {
        log.debug("REST request to partial update Domiciliul partially : {}, {}", id, domiciliul);
        if (domiciliul.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, domiciliul.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!domiciliulRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Domiciliul> result = domiciliulRepository
            .findById(domiciliul.getId())
            .map(existingDomiciliul -> {
                if (domiciliul.getAdresaCI() != null) {
                    existingDomiciliul.setAdresaCI(domiciliul.getAdresaCI());
                }

                return existingDomiciliul;
            })
            .map(domiciliulRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, domiciliul.getId().toString())
        );
    }

    /**
     * {@code GET  /domiciliuls} : get all the domiciliuls.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of domiciliuls in body.
     */
    @GetMapping("/domiciliuls")
    public List<Domiciliul> getAllDomiciliuls() {
        log.debug("REST request to get all Domiciliuls");
        return domiciliulRepository.findAll();
    }

    /**
     * {@code GET  /domiciliuls/:id} : get the "id" domiciliul.
     *
     * @param id the id of the domiciliul to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the domiciliul, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/domiciliuls/{id}")
    public ResponseEntity<Domiciliul> getDomiciliul(@PathVariable Long id) {
        log.debug("REST request to get Domiciliul : {}", id);
        Optional<Domiciliul> domiciliul = domiciliulRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(domiciliul);
    }

    /**
     * {@code DELETE  /domiciliuls/:id} : delete the "id" domiciliul.
     *
     * @param id the id of the domiciliul to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/domiciliuls/{id}")
    public ResponseEntity<Void> deleteDomiciliul(@PathVariable Long id) {
        log.debug("REST request to delete Domiciliul : {}", id);
        domiciliulRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
