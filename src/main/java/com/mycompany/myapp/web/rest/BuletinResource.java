package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Buletin;
import com.mycompany.myapp.repository.BuletinRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Buletin}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BuletinResource {

    private final Logger log = LoggerFactory.getLogger(BuletinResource.class);

    private static final String ENTITY_NAME = "buletin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BuletinRepository buletinRepository;

    public BuletinResource(BuletinRepository buletinRepository) {
        this.buletinRepository = buletinRepository;
    }

    /**
     * {@code POST  /buletins} : Create a new buletin.
     *
     * @param buletin the buletin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new buletin, or with status {@code 400 (Bad Request)} if the buletin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/buletins")
    public ResponseEntity<Buletin> createBuletin(@Valid @RequestBody Buletin buletin) throws URISyntaxException {
        log.debug("REST request to save Buletin : {}", buletin);
        if (buletin.getId() != null) {
            throw new BadRequestAlertException("A new buletin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Buletin result = buletinRepository.save(buletin);
        return ResponseEntity
            .created(new URI("/api/buletins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /buletins/:id} : Updates an existing buletin.
     *
     * @param id the id of the buletin to save.
     * @param buletin the buletin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated buletin,
     * or with status {@code 400 (Bad Request)} if the buletin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the buletin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/buletins/{id}")
    public ResponseEntity<Buletin> updateBuletin(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Buletin buletin
    ) throws URISyntaxException {
        log.debug("REST request to update Buletin : {}, {}", id, buletin);
        if (buletin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, buletin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!buletinRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Buletin result = buletinRepository.save(buletin);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, buletin.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /buletins/:id} : Partial updates given fields of an existing buletin, field will ignore if it is null
     *
     * @param id the id of the buletin to save.
     * @param buletin the buletin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated buletin,
     * or with status {@code 400 (Bad Request)} if the buletin is not valid,
     * or with status {@code 404 (Not Found)} if the buletin is not found,
     * or with status {@code 500 (Internal Server Error)} if the buletin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/buletins/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Buletin> partialUpdateBuletin(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Buletin buletin
    ) throws URISyntaxException {
        log.debug("REST request to partial update Buletin partially : {}, {}", id, buletin);
        if (buletin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, buletin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!buletinRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Buletin> result = buletinRepository
            .findById(buletin.getId())
            .map(existingBuletin -> {
                if (buletin.getTip() != null) {
                    existingBuletin.setTip(buletin.getTip());
                }
                if (buletin.getSerie() != null) {
                    existingBuletin.setSerie(buletin.getSerie());
                }
                if (buletin.getNumar() != null) {
                    existingBuletin.setNumar(buletin.getNumar());
                }
                if (buletin.getCnp() != null) {
                    existingBuletin.setCnp(buletin.getCnp());
                }
                if (buletin.getTara() != null) {
                    existingBuletin.setTara(buletin.getTara());
                }
                if (buletin.getJudet() != null) {
                    existingBuletin.setJudet(buletin.getJudet());
                }
                if (buletin.getLocalitate() != null) {
                    existingBuletin.setLocalitate(buletin.getLocalitate());
                }
                if (buletin.getCetatenie() != null) {
                    existingBuletin.setCetatenie(buletin.getCetatenie());
                }
                if (buletin.getData() != null) {
                    existingBuletin.setData(buletin.getData());
                }
                if (buletin.getEliberatDe() != null) {
                    existingBuletin.setEliberatDe(buletin.getEliberatDe());
                }

                return existingBuletin;
            })
            .map(buletinRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, buletin.getId().toString())
        );
    }

    /**
     * {@code GET  /buletins} : get all the buletins.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of buletins in body.
     */
    @GetMapping("/buletins")
    public List<Buletin> getAllBuletins() {
        log.debug("REST request to get all Buletins");
        return buletinRepository.findAll();
    }

    /**
     * {@code GET  /buletins/:id} : get the "id" buletin.
     *
     * @param id the id of the buletin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the buletin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/buletins/{id}")
    public ResponseEntity<Buletin> getBuletin(@PathVariable Long id) {
        log.debug("REST request to get Buletin : {}", id);
        Optional<Buletin> buletin = buletinRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(buletin);
    }

    /**
     * {@code DELETE  /buletins/:id} : delete the "id" buletin.
     *
     * @param id the id of the buletin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/buletins/{id}")
    public ResponseEntity<Void> deleteBuletin(@PathVariable Long id) {
        log.debug("REST request to delete Buletin : {}", id);
        buletinRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
