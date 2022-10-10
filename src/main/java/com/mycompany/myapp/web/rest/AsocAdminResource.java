package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.AsocAdmin;
import com.mycompany.myapp.repository.AsocAdminRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.AsocAdmin}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AsocAdminResource {

    private final Logger log = LoggerFactory.getLogger(AsocAdminResource.class);

    private static final String ENTITY_NAME = "asocAdmin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsocAdminRepository asocAdminRepository;

    public AsocAdminResource(AsocAdminRepository asocAdminRepository) {
        this.asocAdminRepository = asocAdminRepository;
    }

    /**
     * {@code POST  /asoc-admins} : Create a new asocAdmin.
     *
     * @param asocAdmin the asocAdmin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new asocAdmin, or with status {@code 400 (Bad Request)} if the asocAdmin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asoc-admins")
    public ResponseEntity<AsocAdmin> createAsocAdmin(@RequestBody AsocAdmin asocAdmin) throws URISyntaxException {
        log.debug("REST request to save AsocAdmin : {}", asocAdmin);
        if (asocAdmin.getId() != null) {
            throw new BadRequestAlertException("A new asocAdmin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AsocAdmin result = asocAdminRepository.save(asocAdmin);
        return ResponseEntity
            .created(new URI("/api/asoc-admins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /asoc-admins/:id} : Updates an existing asocAdmin.
     *
     * @param id the id of the asocAdmin to save.
     * @param asocAdmin the asocAdmin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asocAdmin,
     * or with status {@code 400 (Bad Request)} if the asocAdmin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the asocAdmin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asoc-admins/{id}")
    public ResponseEntity<AsocAdmin> updateAsocAdmin(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AsocAdmin asocAdmin
    ) throws URISyntaxException {
        log.debug("REST request to update AsocAdmin : {}, {}", id, asocAdmin);
        if (asocAdmin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, asocAdmin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!asocAdminRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AsocAdmin result = asocAdminRepository.save(asocAdmin);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, asocAdmin.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /asoc-admins/:id} : Partial updates given fields of an existing asocAdmin, field will ignore if it is null
     *
     * @param id the id of the asocAdmin to save.
     * @param asocAdmin the asocAdmin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asocAdmin,
     * or with status {@code 400 (Bad Request)} if the asocAdmin is not valid,
     * or with status {@code 404 (Not Found)} if the asocAdmin is not found,
     * or with status {@code 500 (Internal Server Error)} if the asocAdmin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/asoc-admins/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AsocAdmin> partialUpdateAsocAdmin(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AsocAdmin asocAdmin
    ) throws URISyntaxException {
        log.debug("REST request to partial update AsocAdmin partially : {}, {}", id, asocAdmin);
        if (asocAdmin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, asocAdmin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!asocAdminRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AsocAdmin> result = asocAdminRepository
            .findById(asocAdmin.getId())
            .map(existingAsocAdmin -> {
                if (asocAdmin.getPersoanaFizica() != null) {
                    existingAsocAdmin.setPersoanaFizica(asocAdmin.getPersoanaFizica());
                }
                if (asocAdmin.getAsociat() != null) {
                    existingAsocAdmin.setAsociat(asocAdmin.getAsociat());
                }

                return existingAsocAdmin;
            })
            .map(asocAdminRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, asocAdmin.getId().toString())
        );
    }

    /**
     * {@code GET  /asoc-admins} : get all the asocAdmins.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of asocAdmins in body.
     */
    @GetMapping("/asoc-admins")
    public List<AsocAdmin> getAllAsocAdmins() {
        log.debug("REST request to get all AsocAdmins");
        return asocAdminRepository.findAll();
    }

    /**
     * {@code GET  /asoc-admins/:id} : get the "id" asocAdmin.
     *
     * @param id the id of the asocAdmin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the asocAdmin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asoc-admins/{id}")
    public ResponseEntity<AsocAdmin> getAsocAdmin(@PathVariable Long id) {
        log.debug("REST request to get AsocAdmin : {}", id);
        Optional<AsocAdmin> asocAdmin = asocAdminRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(asocAdmin);
    }

    /**
     * {@code DELETE  /asoc-admins/:id} : delete the "id" asocAdmin.
     *
     * @param id the id of the asocAdmin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asoc-admins/{id}")
    public ResponseEntity<Void> deleteAsocAdmin(@PathVariable Long id) {
        log.debug("REST request to delete AsocAdmin : {}", id);
        asocAdminRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
