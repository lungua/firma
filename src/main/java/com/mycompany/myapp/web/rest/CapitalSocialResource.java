package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CapitalSocial;
import com.mycompany.myapp.repository.CapitalSocialRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.CapitalSocial}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CapitalSocialResource {

    private final Logger log = LoggerFactory.getLogger(CapitalSocialResource.class);

    private static final String ENTITY_NAME = "capitalSocial";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CapitalSocialRepository capitalSocialRepository;

    public CapitalSocialResource(CapitalSocialRepository capitalSocialRepository) {
        this.capitalSocialRepository = capitalSocialRepository;
    }

    /**
     * {@code POST  /capital-socials} : Create a new capitalSocial.
     *
     * @param capitalSocial the capitalSocial to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new capitalSocial, or with status {@code 400 (Bad Request)} if the capitalSocial has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/capital-socials")
    public ResponseEntity<CapitalSocial> createCapitalSocial(@RequestBody CapitalSocial capitalSocial) throws URISyntaxException {
        log.debug("REST request to save CapitalSocial : {}", capitalSocial);
        if (capitalSocial.getId() != null) {
            throw new BadRequestAlertException("A new capitalSocial cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CapitalSocial result = capitalSocialRepository.save(capitalSocial);
        return ResponseEntity
            .created(new URI("/api/capital-socials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /capital-socials/:id} : Updates an existing capitalSocial.
     *
     * @param id the id of the capitalSocial to save.
     * @param capitalSocial the capitalSocial to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated capitalSocial,
     * or with status {@code 400 (Bad Request)} if the capitalSocial is not valid,
     * or with status {@code 500 (Internal Server Error)} if the capitalSocial couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/capital-socials/{id}")
    public ResponseEntity<CapitalSocial> updateCapitalSocial(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CapitalSocial capitalSocial
    ) throws URISyntaxException {
        log.debug("REST request to update CapitalSocial : {}, {}", id, capitalSocial);
        if (capitalSocial.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, capitalSocial.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!capitalSocialRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CapitalSocial result = capitalSocialRepository.save(capitalSocial);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, capitalSocial.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /capital-socials/:id} : Partial updates given fields of an existing capitalSocial, field will ignore if it is null
     *
     * @param id the id of the capitalSocial to save.
     * @param capitalSocial the capitalSocial to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated capitalSocial,
     * or with status {@code 400 (Bad Request)} if the capitalSocial is not valid,
     * or with status {@code 404 (Not Found)} if the capitalSocial is not found,
     * or with status {@code 500 (Internal Server Error)} if the capitalSocial couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/capital-socials/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CapitalSocial> partialUpdateCapitalSocial(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CapitalSocial capitalSocial
    ) throws URISyntaxException {
        log.debug("REST request to partial update CapitalSocial partially : {}, {}", id, capitalSocial);
        if (capitalSocial.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, capitalSocial.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!capitalSocialRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CapitalSocial> result = capitalSocialRepository
            .findById(capitalSocial.getId())
            .map(existingCapitalSocial -> {
                if (capitalSocial.getSuma() != null) {
                    existingCapitalSocial.setSuma(capitalSocial.getSuma());
                }

                return existingCapitalSocial;
            })
            .map(capitalSocialRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, capitalSocial.getId().toString())
        );
    }

    /**
     * {@code GET  /capital-socials} : get all the capitalSocials.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of capitalSocials in body.
     */
    @GetMapping("/capital-socials")
    public List<CapitalSocial> getAllCapitalSocials() {
        log.debug("REST request to get all CapitalSocials");
        return capitalSocialRepository.findAll();
    }

    /**
     * {@code GET  /capital-socials/:id} : get the "id" capitalSocial.
     *
     * @param id the id of the capitalSocial to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the capitalSocial, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/capital-socials/{id}")
    public ResponseEntity<CapitalSocial> getCapitalSocial(@PathVariable Long id) {
        log.debug("REST request to get CapitalSocial : {}", id);
        Optional<CapitalSocial> capitalSocial = capitalSocialRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(capitalSocial);
    }

    /**
     * {@code DELETE  /capital-socials/:id} : delete the "id" capitalSocial.
     *
     * @param id the id of the capitalSocial to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/capital-socials/{id}")
    public ResponseEntity<Void> deleteCapitalSocial(@PathVariable Long id) {
        log.debug("REST request to delete CapitalSocial : {}", id);
        capitalSocialRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
