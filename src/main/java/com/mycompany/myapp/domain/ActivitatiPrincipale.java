package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ActivitatiPrincipale.
 */
@Entity
@Table(name = "activitati_principale")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ActivitatiPrincipale implements Serializable {

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
            "inregistratDe", "asocadmins", "capitalsocials", "alteactivitatis", "activitatiprincipales", "activitatisecundares", "sedius",
        },
        allowSetters = true
    )
    private Srl srl3;

    @ManyToMany(mappedBy = "actprinc1s")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "adresas", "dovadas", "proprietaris", "actprinc1s", "actprinc2s", "srl4" }, allowSetters = true)
    private Set<Sediul> sediulxes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ActivitatiPrincipale id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodCAEN() {
        return this.codCAEN;
    }

    public ActivitatiPrincipale codCAEN(String codCAEN) {
        this.setCodCAEN(codCAEN);
        return this;
    }

    public void setCodCAEN(String codCAEN) {
        this.codCAEN = codCAEN;
    }

    public String getDenumirea() {
        return this.denumirea;
    }

    public ActivitatiPrincipale denumirea(String denumirea) {
        this.setDenumirea(denumirea);
        return this;
    }

    public void setDenumirea(String denumirea) {
        this.denumirea = denumirea;
    }

    public Srl getSrl3() {
        return this.srl3;
    }

    public void setSrl3(Srl srl) {
        this.srl3 = srl;
    }

    public ActivitatiPrincipale srl3(Srl srl) {
        this.setSrl3(srl);
        return this;
    }

    public Set<Sediul> getSediulxes() {
        return this.sediulxes;
    }

    public void setSediulxes(Set<Sediul> sediuls) {
        if (this.sediulxes != null) {
            this.sediulxes.forEach(i -> i.removeActprinc1(this));
        }
        if (sediuls != null) {
            sediuls.forEach(i -> i.addActprinc1(this));
        }
        this.sediulxes = sediuls;
    }

    public ActivitatiPrincipale sediulxes(Set<Sediul> sediuls) {
        this.setSediulxes(sediuls);
        return this;
    }

    public ActivitatiPrincipale addSediulx(Sediul sediul) {
        this.sediulxes.add(sediul);
        sediul.getActprinc1s().add(this);
        return this;
    }

    public ActivitatiPrincipale removeSediulx(Sediul sediul) {
        this.sediulxes.remove(sediul);
        sediul.getActprinc1s().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ActivitatiPrincipale)) {
            return false;
        }
        return id != null && id.equals(((ActivitatiPrincipale) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ActivitatiPrincipale{" +
            "id=" + getId() +
            ", codCAEN='" + getCodCAEN() + "'" +
            ", denumirea='" + getDenumirea() + "'" +
            "}";
    }
}
