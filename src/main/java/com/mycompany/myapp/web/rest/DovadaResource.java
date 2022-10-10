package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Dovada;
import com.mycompany.myapp.repository.DovadaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Dovada}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DovadaResource {

    private final Logger log = LoggerFactory.getLogger(DovadaResource.class);

    private static final String ENTITY_NAME = "dovada";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DovadaRepository dovadaRepository;

    public DovadaResource(DovadaRepository dovadaRepository) {
        this.dovadaRepository = dovadaRepository;
    }

    /**
     * {@code POST  /dovadas} : Create a new dovada.
     *
     * @param dovada the dovada to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dovada, or with status {@code 400 (Bad Request)} if the dovada has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dovadas")
    public ResponseEntity<Dovada> createDovada(@RequestBody Dovada dovada) throws URISyntaxException {
        log.debug("REST request to save Dovada : {}", dovada);
        if (dovada.getId() != null) {
            throw new BadRequestAlertException("A new dovada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dovada result = dovadaRepository.save(dovada);
        return ResponseEntity
            .created(new URI("/api/dovadas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dovadas/:id} : Updates an existing dovada.
     *
     * @param id the id of the dovada to save.
     * @param dovada the dovada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dovada,
     * or with status {@code 400 (Bad Request)} if the dovada is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dovada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dovadas/{id}")
    public ResponseEntity<Dovada> updateDovada(@PathVariable(value = "id", required = false) final Long id, @RequestBody Dovada dovada)
        throws URISyntaxException {
        log.debug("REST request to update Dovada : {}, {}", id, dovada);
        if (dovada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dovada.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dovadaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Dovada result = dovadaRepository.save(dovada);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dovada.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /dovadas/:id} : Partial updates given fields of an existing dovada, field will ignore if it is null
     *
     * @param id the id of the dovada to save.
     * @param dovada the dovada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dovada,
     * or with status {@code 400 (Bad Request)} if the dovada is not valid,
     * or with status {@code 404 (Not Found)} if the dovada is not found,
     * or with status {@code 500 (Internal Server Error)} if the dovada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/dovadas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Dovada> partialUpdateDovada(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Dovada dovada
    ) throws URISyntaxException {
        log.debug("REST request to partial update Dovada partially : {}, {}", id, dovada);
        if (dovada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dovada.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dovadaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Dovada> result = dovadaRepository
            .findById(dovada.getId())
            .map(existingDovada -> {
                if (dovada.getComodatInchiriere() != null) {
                    existingDovada.setComodatInchiriere(dovada.getComodatInchiriere());
                }
                if (dovada.getDurata() != null) {
                    existingDovada.setDurata(dovada.getDurata());
                }
                if (dovada.getValoareInchiriere() != null) {
                    existingDovada.setValoareInchiriere(dovada.getValoareInchiriere());
                }
                if (dovada.getValoareGarantie() != null) {
                    existingDovada.setValoareGarantie(dovada.getValoareGarantie());
                }
                if (dovada.getMoneda() != null) {
                    existingDovada.setMoneda(dovada.getMoneda());
                }

                return existingDovada;
            })
            .map(dovadaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dovada.getId().toString())
        );
    }

    /**
     * {@code GET  /dovadas} : get all the dovadas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dovadas in body.
     */
    @GetMapping("/dovadas")
    public List<Dovada> getAllDovadas() {
        log.debug("REST request to get all Dovadas");
        return dovadaRepository.findAll();
    }

    /**
     * {@code GET  /dovadas/:id} : get the "id" dovada.
     *
     * @param id the id of the dovada to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dovada, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dovadas/{id}")
    public ResponseEntity<Dovada> getDovada(@PathVariable Long id) {
        log.debug("REST request to get Dovada : {}", id);
        Optional<Dovada> dovada = dovadaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dovada);
    }

    /**
     * {@code DELETE  /dovadas/:id} : delete the "id" dovada.
     *
     * @param id the id of the dovada to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dovadas/{id}")
    public ResponseEntity<Void> deleteDovada(@PathVariable Long id) {
        log.debug("REST request to delete Dovada : {}", id);
        dovadaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
