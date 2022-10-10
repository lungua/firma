package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.Moneda;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Dovada.
 */
@Entity
@Table(name = "dovada")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Dovada implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "comodat_inchiriere")
    private Boolean comodatInchiriere;

    @Column(name = "durata")
    private Integer durata;

    @Column(name = "valoare_inchiriere")
    private Integer valoareInchiriere;

    @Column(name = "valoare_garantie")
    private Integer valoareGarantie;

    @Enumerated(EnumType.STRING)
    @Column(name = "moneda")
    private Moneda moneda;

    @ManyToOne
    @JsonIgnoreProperties(value = { "adresas", "dovadas", "proprietaris", "actprinc1s", "actprinc2s", "srl4" }, allowSetters = true)
    private Sediul sediu2;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Dovada id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getComodatInchiriere() {
        return this.comodatInchiriere;
    }

    public Dovada comodatInchiriere(Boolean comodatInchiriere) {
        this.setComodatInchiriere(comodatInchiriere);
        return this;
    }

    public void setComodatInchiriere(Boolean comodatInchiriere) {
        this.comodatInchiriere = comodatInchiriere;
    }

    public Integer getDurata() {
        return this.durata;
    }

    public Dovada durata(Integer durata) {
        this.setDurata(durata);
        return this;
    }

    public void setDurata(Integer durata) {
        this.durata = durata;
    }

    public Integer getValoareInchiriere() {
        return this.valoareInchiriere;
    }

    public Dovada valoareInchiriere(Integer valoareInchiriere) {
        this.setValoareInchiriere(valoareInchiriere);
        return this;
    }

    public void setValoareInchiriere(Integer valoareInchiriere) {
        this.valoareInchiriere = valoareInchiriere;
    }

    public Integer getValoareGarantie() {
        return this.valoareGarantie;
    }

    public Dovada valoareGarantie(Integer valoareGarantie) {
        this.setValoareGarantie(valoareGarantie);
        return this;
    }

    public void setValoareGarantie(Integer valoareGarantie) {
        this.valoareGarantie = valoareGarantie;
    }

    public Moneda getMoneda() {
        return this.moneda;
    }

    public Dovada moneda(Moneda moneda) {
        this.setMoneda(moneda);
        return this;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }

    public Sediul getSediu2() {
        return this.sediu2;
    }

    public void setSediu2(Sediul sediul) {
        this.sediu2 = sediul;
    }

    public Dovada sediu2(Sediul sediul) {
        this.setSediu2(sediul);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Dovada)) {
            return false;
        }
        return id != null && id.equals(((Dovada) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Dovada{" +
            "id=" + getId() +
            ", comodatInchiriere='" + getComodatInchiriere() + "'" +
            ", durata=" + getDurata() +
            ", valoareInchiriere=" + getValoareInchiriere() +
            ", valoareGarantie=" + getValoareGarantie() +
            ", moneda='" + getMoneda() + "'" +
            "}";
    }
}
