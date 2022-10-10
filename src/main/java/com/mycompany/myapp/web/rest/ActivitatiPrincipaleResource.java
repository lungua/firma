package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ActivitatiPrincipale;
import com.mycompany.myapp.repository.ActivitatiPrincipaleRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ActivitatiPrincipale}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ActivitatiPrincipaleResource {

    private final Logger log = LoggerFactory.getLogger(ActivitatiPrincipaleResource.class);

    private static final String ENTITY_NAME = "activitatiPrincipale";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ActivitatiPrincipaleRepository activitatiPrincipaleRepository;

    public ActivitatiPrincipaleResource(ActivitatiPrincipaleRepository activitatiPrincipaleRepository) {
        this.activitatiPrincipaleRepository = activitatiPrincipaleRepository;
    }

    /**
     * {@code POST  /activitati-principales} : Create a new activitatiPrincipale.
     *
     * @param activitatiPrincipale the activitatiPrincipale to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new activitatiPrincipale, or with status {@code 400 (Bad Request)} if the activitatiPrincipale has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/activitati-principales")
    public ResponseEntity<ActivitatiPrincipale> createActivitatiPrincipale(@RequestBody ActivitatiPrincipale activitatiPrincipale)
        throws URISyntaxException {
        log.debug("REST request to save ActivitatiPrincipale : {}", activitatiPrincipale);
        if (activitatiPrincipale.getId() != null) {
            throw new BadRequestAlertException("A new activitatiPrincipale cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ActivitatiPrincipale result = activitatiPrincipaleRepository.save(activitatiPrincipale);
        return ResponseEntity
            .created(new URI("/api/activitati-principales/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /activitati-principales/:id} : Updates an existing activitatiPrincipale.
     *
     * @param id the id of the activitatiPrincipale to save.
     * @param activitatiPrincipale the activitatiPrincipale to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated activitatiPrincipale,
     * or with status {@code 400 (Bad Request)} if the activitatiPrincipale is not valid,
     * or with status {@code 500 (Internal Server Error)} if the activitatiPrincipale couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/activitati-principales/{id}")
    public ResponseEntity<ActivitatiPrincipale> updateActivitatiPrincipale(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ActivitatiPrincipale activitatiPrincipale
    ) throws URISyntaxException {
        log.debug("REST request to update ActivitatiPrincipale : {}, {}", id, activitatiPrincipale);
        if (activitatiPrincipale.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, activitatiPrincipale.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!activitatiPrincipaleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ActivitatiPrincipale result = activitatiPrincipaleRepository.save(activitatiPrincipale);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, activitatiPrincipale.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /activitati-principales/:id} : Partial updates given fields of an existing activitatiPrincipale, field will ignore if it is null
     *
     * @param id the id of the activitatiPrincipale to save.
     * @param activitatiPrincipale the activitatiPrincipale to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated activitatiPrincipale,
     * or with status {@code 400 (Bad Request)} if the activitatiPrincipale is not valid,
     * or with status {@code 404 (Not Found)} if the activitatiPrincipale is not found,
     * or with status {@code 500 (Internal Server Error)} if the activitatiPrincipale couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/activitati-principales/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ActivitatiPrincipale> partialUpdateActivitatiPrincipale(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ActivitatiPrincipale activitatiPrincipale
    ) throws URISyntaxException {
        log.debug("REST request to partial update ActivitatiPrincipale partially : {}, {}", id, activitatiPrincipale);
        if (activitatiPrincipale.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, activitatiPrincipale.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!activitatiPrincipaleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ActivitatiPrincipale> result = activitatiPrincipaleRepository
            .findById(activitatiPrincipale.getId())
            .map(existingActivitatiPrincipale -> {
                if (activitatiPrincipale.getCodCAEN() != null) {
                    existingActivitatiPrincipale.setCodCAEN(activitatiPrincipale.getCodCAEN());
                }
                if (activitatiPrincipale.getDenumirea() != null) {
                    existingActivitatiPrincipale.setDenumirea(activitatiPrincipale.getDenumirea());
                }

                return existingActivitatiPrincipale;
            })
            .map(activitatiPrincipaleRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, activitatiPrincipale.getId().toString())
        );
    }

    /**
     * {@code GET  /activitati-principales} : get all the activitatiPrincipales.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of activitatiPrincipales in body.
     */
    @GetMapping("/activitati-principales")
    public List<ActivitatiPrincipale> getAllActivitatiPrincipales() {
        log.debug("REST request to get all ActivitatiPrincipales");
        return activitatiPrincipaleRepository.findAll();
    }

    /**
     * {@code GET  /activitati-principales/:id} : get the "id" activitatiPrincipale.
     *
     * @param id the id of the activitatiPrincipale to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the activitatiPrincipale, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/activitati-principales/{id}")
    public ResponseEntity<ActivitatiPrincipale> getActivitatiPrincipale(@PathVariable Long id) {
        log.debug("REST request to get ActivitatiPrincipale : {}", id);
        Optional<ActivitatiPrincipale> activitatiPrincipale = activitatiPrincipaleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(activitatiPrincipale);
    }

    /**
     * {@code DELETE  /activitati-principales/:id} : delete the "id" activitatiPrincipale.
     *
     * @param id the id of the activitatiPrincipale to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/activitati-principales/{id}")
    public ResponseEntity<Void> deleteActivitatiPrincipale(@PathVariable Long id) {
        log.debug("REST request to delete ActivitatiPrincipale : {}", id);
        activitatiPrincipaleRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
