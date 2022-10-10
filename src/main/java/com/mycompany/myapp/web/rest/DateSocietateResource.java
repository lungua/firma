package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DateSocietate;
import com.mycompany.myapp.repository.DateSocietateRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.DateSocietate}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DateSocietateResource {

    private final Logger log = LoggerFactory.getLogger(DateSocietateResource.class);

    private static final String ENTITY_NAME = "dateSocietate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DateSocietateRepository dateSocietateRepository;

    public DateSocietateResource(DateSocietateRepository dateSocietateRepository) {
        this.dateSocietateRepository = dateSocietateRepository;
    }

    /**
     * {@code POST  /date-societates} : Create a new dateSocietate.
     *
     * @param dateSocietate the dateSocietate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dateSocietate, or with status {@code 400 (Bad Request)} if the dateSocietate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/date-societates")
    public ResponseEntity<DateSocietate> createDateSocietate(@RequestBody DateSocietate dateSocietate) throws URISyntaxException {
        log.debug("REST request to save DateSocietate : {}", dateSocietate);
        if (dateSocietate.getId() != null) {
            throw new BadRequestAlertException("A new dateSocietate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DateSocietate result = dateSocietateRepository.save(dateSocietate);
        return ResponseEntity
            .created(new URI("/api/date-societates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /date-societates/:id} : Updates an existing dateSocietate.
     *
     * @param id the id of the dateSocietate to save.
     * @param dateSocietate the dateSocietate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dateSocietate,
     * or with status {@code 400 (Bad Request)} if the dateSocietate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dateSocietate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/date-societates/{id}")
    public ResponseEntity<DateSocietate> updateDateSocietate(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DateSocietate dateSocietate
    ) throws URISyntaxException {
        log.debug("REST request to update DateSocietate : {}, {}", id, dateSocietate);
        if (dateSocietate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dateSocietate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dateSocietateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DateSocietate result = dateSocietateRepository.save(dateSocietate);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dateSocietate.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /date-societates/:id} : Partial updates given fields of an existing dateSocietate, field will ignore if it is null
     *
     * @param id the id of the dateSocietate to save.
     * @param dateSocietate the dateSocietate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dateSocietate,
     * or with status {@code 400 (Bad Request)} if the dateSocietate is not valid,
     * or with status {@code 404 (Not Found)} if the dateSocietate is not found,
     * or with status {@code 500 (Internal Server Error)} if the dateSocietate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/date-societates/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DateSocietate> partialUpdateDateSocietate(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DateSocietate dateSocietate
    ) throws URISyntaxException {
        log.debug("REST request to partial update DateSocietate partially : {}, {}", id, dateSocietate);
        if (dateSocietate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dateSocietate.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dateSocietateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DateSocietate> result = dateSocietateRepository
            .findById(dateSocietate.getId())
            .map(existingDateSocietate -> {
                if (dateSocietate.getDenumire() != null) {
                    existingDateSocietate.setDenumire(dateSocietate.getDenumire());
                }
                if (dateSocietate.getCui() != null) {
                    existingDateSocietate.setCui(dateSocietate.getCui());
                }
                if (dateSocietate.getRegComert() != null) {
                    existingDateSocietate.setRegComert(dateSocietate.getRegComert());
                }
                if (dateSocietate.getAdresaSediu() != null) {
                    existingDateSocietate.setAdresaSediu(dateSocietate.getAdresaSediu());
                }

                return existingDateSocietate;
            })
            .map(dateSocietateRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dateSocietate.getId().toString())
        );
    }

    /**
     * {@code GET  /date-societates} : get all the dateSocietates.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dateSocietates in body.
     */
    @GetMapping("/date-societates")
    public List<DateSocietate> getAllDateSocietates() {
        log.debug("REST request to get all DateSocietates");
        return dateSocietateRepository.findAll();
    }

    /**
     * {@code GET  /date-societates/:id} : get the "id" dateSocietate.
     *
     * @param id the id of the dateSocietate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dateSocietate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/date-societates/{id}")
    public ResponseEntity<DateSocietate> getDateSocietate(@PathVariable Long id) {
        log.debug("REST request to get DateSocietate : {}", id);
        Optional<DateSocietate> dateSocietate = dateSocietateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dateSocietate);
    }

    /**
     * {@code DELETE  /date-societates/:id} : delete the "id" dateSocietate.
     *
     * @param id the id of the dateSocietate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/date-societates/{id}")
    public ResponseEntity<Void> deleteDateSocietate(@PathVariable Long id) {
        log.debug("REST request to delete DateSocietate : {}", id);
        dateSocietateRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
