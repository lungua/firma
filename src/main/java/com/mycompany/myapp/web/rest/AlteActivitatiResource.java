package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.AlteActivitati;
import com.mycompany.myapp.repository.AlteActivitatiRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.AlteActivitati}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AlteActivitatiResource {

    private final Logger log = LoggerFactory.getLogger(AlteActivitatiResource.class);

    private static final String ENTITY_NAME = "alteActivitati";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlteActivitatiRepository alteActivitatiRepository;

    public AlteActivitatiResource(AlteActivitatiRepository alteActivitatiRepository) {
        this.alteActivitatiRepository = alteActivitatiRepository;
    }

    /**
     * {@code POST  /alte-activitatis} : Create a new alteActivitati.
     *
     * @param alteActivitati the alteActivitati to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new alteActivitati, or with status {@code 400 (Bad Request)} if the alteActivitati has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/alte-activitatis")
    public ResponseEntity<AlteActivitati> createAlteActivitati(@RequestBody AlteActivitati alteActivitati) throws URISyntaxException {
        log.debug("REST request to save AlteActivitati : {}", alteActivitati);
        if (alteActivitati.getId() != null) {
            throw new BadRequestAlertException("A new alteActivitati cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlteActivitati result = alteActivitatiRepository.save(alteActivitati);
        return ResponseEntity
            .created(new URI("/api/alte-activitatis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /alte-activitatis/:id} : Updates an existing alteActivitati.
     *
     * @param id the id of the alteActivitati to save.
     * @param alteActivitati the alteActivitati to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alteActivitati,
     * or with status {@code 400 (Bad Request)} if the alteActivitati is not valid,
     * or with status {@code 500 (Internal Server Error)} if the alteActivitati couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/alte-activitatis/{id}")
    public ResponseEntity<AlteActivitati> updateAlteActivitati(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AlteActivitati alteActivitati
    ) throws URISyntaxException {
        log.debug("REST request to update AlteActivitati : {}, {}", id, alteActivitati);
        if (alteActivitati.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alteActivitati.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alteActivitatiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AlteActivitati result = alteActivitatiRepository.save(alteActivitati);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, alteActivitati.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /alte-activitatis/:id} : Partial updates given fields of an existing alteActivitati, field will ignore if it is null
     *
     * @param id the id of the alteActivitati to save.
     * @param alteActivitati the alteActivitati to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alteActivitati,
     * or with status {@code 400 (Bad Request)} if the alteActivitati is not valid,
     * or with status {@code 404 (Not Found)} if the alteActivitati is not found,
     * or with status {@code 500 (Internal Server Error)} if the alteActivitati couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/alte-activitatis/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AlteActivitati> partialUpdateAlteActivitati(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AlteActivitati alteActivitati
    ) throws URISyntaxException {
        log.debug("REST request to partial update AlteActivitati partially : {}, {}", id, alteActivitati);
        if (alteActivitati.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alteActivitati.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alteActivitatiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AlteActivitati> result = alteActivitatiRepository
            .findById(alteActivitati.getId())
            .map(existingAlteActivitati -> {
                if (alteActivitati.getCodCAEN() != null) {
                    existingAlteActivitati.setCodCAEN(alteActivitati.getCodCAEN());
                }
                if (alteActivitati.getDenumirea() != null) {
                    existingAlteActivitati.setDenumirea(alteActivitati.getDenumirea());
                }

                return existingAlteActivitati;
            })
            .map(alteActivitatiRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, alteActivitati.getId().toString())
        );
    }

    /**
     * {@code GET  /alte-activitatis} : get all the alteActivitatis.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of alteActivitatis in body.
     */
    @GetMapping("/alte-activitatis")
    public List<AlteActivitati> getAllAlteActivitatis() {
        log.debug("REST request to get all AlteActivitatis");
        return alteActivitatiRepository.findAll();
    }

    /**
     * {@code GET  /alte-activitatis/:id} : get the "id" alteActivitati.
     *
     * @param id the id of the alteActivitati to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the alteActivitati, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/alte-activitatis/{id}")
    public ResponseEntity<AlteActivitati> getAlteActivitati(@PathVariable Long id) {
        log.debug("REST request to get AlteActivitati : {}", id);
        Optional<AlteActivitati> alteActivitati = alteActivitatiRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(alteActivitati);
    }

    /**
     * {@code DELETE  /alte-activitatis/:id} : delete the "id" alteActivitati.
     *
     * @param id the id of the alteActivitati to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/alte-activitatis/{id}")
    public ResponseEntity<Void> deleteAlteActivitati(@PathVariable Long id) {
        log.debug("REST request to delete AlteActivitati : {}", id);
        alteActivitatiRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
