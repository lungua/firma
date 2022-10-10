package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DateAsociati;
import com.mycompany.myapp.repository.DateAsociatiRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.DateAsociati}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DateAsociatiResource {

    private final Logger log = LoggerFactory.getLogger(DateAsociatiResource.class);

    private static final String ENTITY_NAME = "dateAsociati";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DateAsociatiRepository dateAsociatiRepository;

    public DateAsociatiResource(DateAsociatiRepository dateAsociatiRepository) {
        this.dateAsociatiRepository = dateAsociatiRepository;
    }

    /**
     * {@code POST  /date-asociatis} : Create a new dateAsociati.
     *
     * @param dateAsociati the dateAsociati to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dateAsociati, or with status {@code 400 (Bad Request)} if the dateAsociati has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/date-asociatis")
    public ResponseEntity<DateAsociati> createDateAsociati(@RequestBody DateAsociati dateAsociati) throws URISyntaxException {
        log.debug("REST request to save DateAsociati : {}", dateAsociati);
        if (dateAsociati.getId() != null) {
            throw new BadRequestAlertException("A new dateAsociati cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DateAsociati result = dateAsociatiRepository.save(dateAsociati);
        return ResponseEntity
            .created(new URI("/api/date-asociatis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /date-asociatis/:id} : Updates an existing dateAsociati.
     *
     * @param id the id of the dateAsociati to save.
     * @param dateAsociati the dateAsociati to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dateAsociati,
     * or with status {@code 400 (Bad Request)} if the dateAsociati is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dateAsociati couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/date-asociatis/{id}")
    public ResponseEntity<DateAsociati> updateDateAsociati(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DateAsociati dateAsociati
    ) throws URISyntaxException {
        log.debug("REST request to update DateAsociati : {}, {}", id, dateAsociati);
        if (dateAsociati.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dateAsociati.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dateAsociatiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DateAsociati result = dateAsociatiRepository.save(dateAsociati);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dateAsociati.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /date-asociatis/:id} : Partial updates given fields of an existing dateAsociati, field will ignore if it is null
     *
     * @param id the id of the dateAsociati to save.
     * @param dateAsociati the dateAsociati to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dateAsociati,
     * or with status {@code 400 (Bad Request)} if the dateAsociati is not valid,
     * or with status {@code 404 (Not Found)} if the dateAsociati is not found,
     * or with status {@code 500 (Internal Server Error)} if the dateAsociati couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/date-asociatis/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DateAsociati> partialUpdateDateAsociati(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DateAsociati dateAsociati
    ) throws URISyntaxException {
        log.debug("REST request to partial update DateAsociati partially : {}, {}", id, dateAsociati);
        if (dateAsociati.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dateAsociati.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dateAsociatiRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DateAsociati> result = dateAsociatiRepository
            .findById(dateAsociati.getId())
            .map(existingDateAsociati -> {
                if (dateAsociati.getNume() != null) {
                    existingDateAsociati.setNume(dateAsociati.getNume());
                }
                if (dateAsociati.getPrenume() != null) {
                    existingDateAsociati.setPrenume(dateAsociati.getPrenume());
                }
                if (dateAsociati.getTelefon() != null) {
                    existingDateAsociati.setTelefon(dateAsociati.getTelefon());
                }

                return existingDateAsociati;
            })
            .map(dateAsociatiRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dateAsociati.getId().toString())
        );
    }

    /**
     * {@code GET  /date-asociatis} : get all the dateAsociatis.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dateAsociatis in body.
     */
    @GetMapping("/date-asociatis")
    public List<DateAsociati> getAllDateAsociatis() {
        log.debug("REST request to get all DateAsociatis");
        return dateAsociatiRepository.findAll();
    }

    /**
     * {@code GET  /date-asociatis/:id} : get the "id" dateAsociati.
     *
     * @param id the id of the dateAsociati to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dateAsociati, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/date-asociatis/{id}")
    public ResponseEntity<DateAsociati> getDateAsociati(@PathVariable Long id) {
        log.debug("REST request to get DateAsociati : {}", id);
        Optional<DateAsociati> dateAsociati = dateAsociatiRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dateAsociati);
    }

    /**
     * {@code DELETE  /date-asociatis/:id} : delete the "id" dateAsociati.
     *
     * @param id the id of the dateAsociati to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/date-asociatis/{id}")
    public ResponseEntity<Void> deleteDateAsociati(@PathVariable Long id) {
        log.debug("REST request to delete DateAsociati : {}", id);
        dateAsociatiRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
