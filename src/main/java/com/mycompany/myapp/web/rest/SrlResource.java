package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Srl;
import com.mycompany.myapp.repository.SrlRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Srl}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SrlResource {

    private final Logger log = LoggerFactory.getLogger(SrlResource.class);

    private static final String ENTITY_NAME = "srl";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SrlRepository srlRepository;

    public SrlResource(SrlRepository srlRepository) {
        this.srlRepository = srlRepository;
    }

    /**
     * {@code POST  /srls} : Create a new srl.
     *
     * @param srl the srl to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new srl, or with status {@code 400 (Bad Request)} if the srl has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/srls")
    public ResponseEntity<Srl> createSrl(@RequestBody Srl srl) throws URISyntaxException {
        log.debug("REST request to save Srl : {}", srl);
        if (srl.getId() != null) {
            throw new BadRequestAlertException("A new srl cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Srl result = srlRepository.save(srl);
        return ResponseEntity
            .created(new URI("/api/srls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /srls/:id} : Updates an existing srl.
     *
     * @param id the id of the srl to save.
     * @param srl the srl to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated srl,
     * or with status {@code 400 (Bad Request)} if the srl is not valid,
     * or with status {@code 500 (Internal Server Error)} if the srl couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/srls/{id}")
    public ResponseEntity<Srl> updateSrl(@PathVariable(value = "id", required = false) final Long id, @RequestBody Srl srl)
        throws URISyntaxException {
        log.debug("REST request to update Srl : {}, {}", id, srl);
        if (srl.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, srl.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!srlRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Srl result = srlRepository.save(srl);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, srl.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /srls/:id} : Partial updates given fields of an existing srl, field will ignore if it is null
     *
     * @param id the id of the srl to save.
     * @param srl the srl to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated srl,
     * or with status {@code 400 (Bad Request)} if the srl is not valid,
     * or with status {@code 404 (Not Found)} if the srl is not found,
     * or with status {@code 500 (Internal Server Error)} if the srl couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/srls/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Srl> partialUpdateSrl(@PathVariable(value = "id", required = false) final Long id, @RequestBody Srl srl)
        throws URISyntaxException {
        log.debug("REST request to partial update Srl partially : {}, {}", id, srl);
        if (srl.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, srl.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!srlRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Srl> result = srlRepository
            .findById(srl.getId())
            .map(existingSrl -> {
                if (srl.getNume1() != null) {
                    existingSrl.setNume1(srl.getNume1());
                }
                if (srl.getNume2() != null) {
                    existingSrl.setNume2(srl.getNume2());
                }
                if (srl.getNume3() != null) {
                    existingSrl.setNume3(srl.getNume3());
                }
                if (srl.getNumeSocietate() != null) {
                    existingSrl.setNumeSocietate(srl.getNumeSocietate());
                }
                if (srl.getNuneFinal() != null) {
                    existingSrl.setNuneFinal(srl.getNuneFinal());
                }
                if (srl.getDataInregistrare() != null) {
                    existingSrl.setDataInregistrare(srl.getDataInregistrare());
                }

                return existingSrl;
            })
            .map(srlRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, srl.getId().toString())
        );
    }

    /**
     * {@code GET  /srls} : get all the srls.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of srls in body.
     */
    @GetMapping("/srls")
    public List<Srl> getAllSrls(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Srls");
        if (eagerload) {
            return srlRepository.findAllWithEagerRelationships();
        } else {
            return srlRepository.findAll();
        }
    }

    /**
     * {@code GET  /srls/:id} : get the "id" srl.
     *
     * @param id the id of the srl to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the srl, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/srls/{id}")
    public ResponseEntity<Srl> getSrl(@PathVariable Long id) {
        log.debug("REST request to get Srl : {}", id);
        Optional<Srl> srl = srlRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(srl);
    }

    /**
     * {@code DELETE  /srls/:id} : delete the "id" srl.
     *
     * @param id the id of the srl to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/srls/{id}")
    public ResponseEntity<Void> deleteSrl(@PathVariable Long id) {
        log.debug("REST request to delete Srl : {}", id);
        srlRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
