package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CapitalSocial.
 */
@Entity
@Table(name = "capital_social")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CapitalSocial implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "suma")
    private String suma;

    @ManyToOne
    @JsonIgnoreProperties(
        value = {
            "inregistratDe", "asocadmins", "capitalsocials", "alteactivitatis", "activitatiprincipales", "activitatisecundares", "sedius",
        },
        allowSetters = true
    )
    private Srl srl1;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CapitalSocial id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSuma() {
        return this.suma;
    }

    public CapitalSocial suma(String suma) {
        this.setSuma(suma);
        return this;
    }

    public void setSuma(String suma) {
        this.suma = suma;
    }

    public Srl getSrl1() {
        return this.srl1;
    }

    public void setSrl1(Srl srl) {
        this.srl1 = srl;
    }

    public CapitalSocial srl1(Srl srl) {
        this.setSrl1(srl);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CapitalSocial)) {
            return false;
        }
        return id != null && id.equals(((CapitalSocial) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CapitalSocial{" +
            "id=" + getId() +
            ", suma='" + getSuma() + "'" +
            "}";
    }
}
