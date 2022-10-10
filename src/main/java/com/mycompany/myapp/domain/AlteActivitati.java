package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AlteActivitati.
 */
@Entity
@Table(name = "alte_activitati")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AlteActivitati implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "cod_caen")
    private String codCAEN;

    @Column(name = "denumirea")
    private String denumirea;

    @ManyToOne
    @JsonIgnoreProperties(
        value = {
            "asocadmins", "capitalsocials", "alteactivitatis", "activitatiprincipales", "activitatisecundares", "sedius", "sumaincasatas",
        },
        allowSetters = true
    )
    private Srl srl2;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AlteActivitati id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodCAEN() {
        return this.codCAEN;
    }

    public AlteActivitati codCAEN(String codCAEN) {
        this.setCodCAEN(codCAEN);
        return this;
    }

    public void setCodCAEN(String codCAEN) {
        this.codCAEN = codCAEN;
    }

    public String getDenumirea() {
        return this.denumirea;
    }

    public AlteActivitati denumirea(String denumirea) {
        this.setDenumirea(denumirea);
        return this;
    }

    public void setDenumirea(String denumirea) {
        this.denumirea = denumirea;
    }

    public Srl getSrl2() {
        return this.srl2;
    }

    public void setSrl2(Srl srl) {
        this.srl2 = srl;
    }

    public AlteActivitati srl2(Srl srl) {
        this.setSrl2(srl);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AlteActivitati)) {
            return false;
        }
        return id != null && id.equals(((AlteActivitati) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AlteActivitati{" +
            "id=" + getId() +
            ", codCAEN='" + getCodCAEN() + "'" +
            ", denumirea='" + getDenumirea() + "'" +
            "}";
    }
}
