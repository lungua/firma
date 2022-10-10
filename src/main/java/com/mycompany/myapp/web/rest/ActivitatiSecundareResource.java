package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ActivitatiSecundare;
import com.mycompany.myapp.repository.ActivitatiSecundareRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ActivitatiSecundare}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ActivitatiSecundareResource {

    private final Logger log = LoggerFactory.getLogger(ActivitatiSecundareResource.class);

    private static final String ENTITY_NAME = "activitatiSecundare";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ActivitatiSecundareRepository activitatiSecundareRepository;

    public ActivitatiSecundareResource(ActivitatiSecundareRepository activitatiSecundareRepository) {
        this.activitatiSecundareRepository = activitatiSecundareRepository;
    }

    /**
     * {@code POST  /activitati-secundares} : Create a new activitatiSecundare.
     *
     * @param activitatiSecundare the activitatiSecundare to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new activitatiSecundare, or with status {@code 400 (Bad Request)} if the activitatiSecundare has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/activitati-secundares")
    public ResponseEntity<ActivitatiSecundare> createActivitatiSecundare(@RequestBody ActivitatiSecundare activitatiSecundare)
        throws URISyntaxException {
        log.debug("REST request to save ActivitatiSecundare : {}", activitatiSecundare);
        if (activitatiSecundare.getId() != null) {
            throw new BadRequestAlertException("A new activitatiSecundare cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ActivitatiSecundare result = activitatiSecundareRepository.save(activitatiSecundare);
        return ResponseEntity
            .created(new URI("/api/activitati-secundares/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /activitati-secundares/:id} : Updates an existing activitatiSecundare.
     *
     * @param id the id of the activitatiSecundare to save.
     * @param activitatiSecundare the activitatiSecundare to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated activitatiSecundare,
     * or with status {@code 400 (Bad Request)} if the activitatiSecundare is not valid,
     * or with status {@code 500 (Internal Server Error)} if the activitatiSecundare couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/activitati-secundares/{id}")
    public ResponseEntity<ActivitatiSecundare> updateActivitatiSecundare(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ActivitatiSecundare activitatiSecundare
    ) throws URISyntaxException {
        log.debug("REST request to update ActivitatiSecundare : {}, {}", id, activitatiSecundare);
        if (activitatiSecundare.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, activitatiSecundare.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!activitatiSecundareRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ActivitatiSecundare result = activitatiSecundareRepository.save(activitatiSecundare);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, activitatiSecundare.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /activitati-secundares/:id} : Partial updates given fields of an existing activitatiSecundare, field will ignore if it is null
     *
     * @param id the id of the activitatiSecundare to save.
     * @param activitatiSecundare the activitatiSecundare to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated activitatiSecundare,
     * or with status {@code 400 (Bad Request)} if the activitatiSecundare is not valid,
     * or with status {@code 404 (Not Found)} if the activitatiSecundare is not found,
     * or with status {@code 500 (Internal Server Error)} if the activitatiSecundare couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/activitati-secundares/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ActivitatiSecundare> partialUpdateActivitatiSecundare(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ActivitatiSecundare activitatiSecundare
    ) throws URISyntaxException {
        log.debug("REST request to partial update ActivitatiSecundare partially : {}, {}", id, activitatiSecundare);
        if (activitatiSecundare.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, activitatiSecundare.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!activitatiSecundareRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ActivitatiSecundare> result = activitatiSecundareRepository
            .findById(activitatiSecundare.getId())
            .map(existingActivitatiSecundare -> {
                if (activitatiSecundare.getCodCAEN() != null) {
                    existingActivitatiSecundare.setCodCAEN(activitatiSecundare.getCodCAEN());
                }
                if (activitatiSecundare.getDenumirea() != null) {
                    existingActivitatiSecundare.setDenumirea(activitatiSecundare.getDenumirea());
                }

                return existingActivitatiSecundare;
            })
            .map(activitatiSecundareRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, activitatiSecundare.getId().toString())
        );
    }

    /**
     * {@code GET  /activitati-secundares} : get all the activitatiSecundares.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of activitatiSecundares in body.
     */
    @GetMapping("/activitati-secundares")
    public List<ActivitatiSecundare> getAllActivitatiSecundares() {
        log.debug("REST request to get all ActivitatiSecundares");
        return activitatiSecundareRepository.findAll();
    }

    /**
     * {@code GET  /activitati-secundares/:id} : get the "id" activitatiSecundare.
     *
     * @param id the id of the activitatiSecundare to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the activitatiSecundare, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/activitati-secundares/{id}")
    public ResponseEntity<ActivitatiSecundare> getActivitatiSecundare(@PathVariable Long id) {
        log.debug("REST request to get ActivitatiSecundare : {}", id);
        Optional<ActivitatiSecundare> activitatiSecundare = activitatiSecundareRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(activitatiSecundare);
    }

    /**
     * {@code DELETE  /activitati-secundares/:id} : delete the "id" activitatiSecundare.
     *
     * @param id the id of the activitatiSecundare to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/activitati-secundares/{id}")
    public ResponseEntity<Void> deleteActivitatiSecundare(@PathVariable Long id) {
        log.debug("REST request to delete ActivitatiSecundare : {}", id);
        activitatiSecundareRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
