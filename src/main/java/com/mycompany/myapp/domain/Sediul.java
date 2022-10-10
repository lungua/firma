package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Sediul.
 */
@Entity
@Table(name = "sediul")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Sediul implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "sediusocial_punct_lucru")
    private Boolean sediusocialPunctLucru;

    @OneToMany(mappedBy = "sediu1")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "sediu1" }, allowSetters = true)
    private Set<Adresa> adresas = new HashSet<>();

    @OneToMany(mappedBy = "sediu2")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "sediu2" }, allowSetters = true)
    private Set<Dovada> dovadas = new HashSet<>();

    @OneToMany(mappedBy = "sediu3")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "sediu3" }, allowSetters = true)
    private Set<Proprietari> proprietaris = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_sediul__actprinc1",
        joinColumns = @JoinColumn(name = "sediul_id"),
        inverseJoinColumns = @JoinColumn(name = "actprinc1_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "srl3", "sediulxes" }, allowSetters = true)
    private Set<ActivitatiPrincipale> actprinc1s = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_sediul__actprinc2",
        joinColumns = @JoinColumn(name = "sediul_id"),
        inverseJoinColumns = @JoinColumn(name = "actprinc2_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "srl5", "sediulies" }, allowSetters = true)
    private Set<ActivitatiSecundare> actprinc2s = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(
        value = {
            "asocadmins", "capitalsocials", "alteactivitatis", "activitatiprincipales", "activitatisecundares", "sedius", "sumaincasatas",
        },
        allowSetters = true
    )
    private Srl srl4;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Sediul id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getSediusocialPunctLucru() {
        return this.sediusocialPunctLucru;
    }

    public Sediul sediusocialPunctLucru(Boolean sediusocialPunctLucru) {
        this.setSediusocialPunctLucru(sediusocialPunctLucru);
        return this;
    }

    public void setSediusocialPunctLucru(Boolean sediusocialPunctLucru) {
        this.sediusocialPunctLucru = sediusocialPunctLucru;
    }

    public Set<Adresa> getAdresas() {
        return this.adresas;
    }

    public void setAdresas(Set<Adresa> adresas) {
        if (this.adresas != null) {
            this.adresas.forEach(i -> i.setSediu1(null));
        }
        if (adresas != null) {
            adresas.forEach(i -> i.setSediu1(this));
        }
        this.adresas = adresas;
    }

    public Sediul adresas(Set<Adresa> adresas) {
        this.setAdresas(adresas);
        return this;
    }

    public Sediul addAdresa(Adresa adresa) {
        this.adresas.add(adresa);
        adresa.setSediu1(this);
        return this;
    }

    public Sediul removeAdresa(Adresa adresa) {
        this.adresas.remove(adresa);
        adresa.setSediu1(null);
        return this;
    }

    public Set<Dovada> getDovadas() {
        return this.dovadas;
    }

    public void setDovadas(Set<Dovada> dovadas) {
        if (this.dovadas != null) {
            this.dovadas.forEach(i -> i.setSediu2(null));
        }
        if (dovadas != null) {
            dovadas.forEach(i -> i.setSediu2(this));
        }
        this.dovadas = dovadas;
    }

    public Sediul dovadas(Set<Dovada> dovadas) {
        this.setDovadas(dovadas);
        return this;
    }

    public Sediul addDovada(Dovada dovada) {
        this.dovadas.add(dovada);
        dovada.setSediu2(this);
        return this;
    }

    public Sediul removeDovada(Dovada dovada) {
        this.dovadas.remove(dovada);
        dovada.setSediu2(null);
        return this;
    }

    public Set<Proprietari> getProprietaris() {
        return this.proprietaris;
    }

    public void setProprietaris(Set<Proprietari> proprietaris) {
        if (this.proprietaris != null) {
            this.proprietaris.forEach(i -> i.setSediu3(null));
        }
        if (proprietaris != null) {
            proprietaris.forEach(i -> i.setSediu3(this));
        }
        this.proprietaris = proprietaris;
    }

    public Sediul proprietaris(Set<Proprietari> proprietaris) {
        this.setProprietaris(proprietaris);
        return this;
    }

    public Sediul addProprietari(Proprietari proprietari) {
        this.proprietaris.add(proprietari);
        proprietari.setSediu3(this);
        return this;
    }

    public Sediul removeProprietari(Proprietari proprietari) {
        this.proprietaris.remove(proprietari);
        proprietari.setSediu3(null);
        return this;
    }

    public Set<ActivitatiPrincipale> getActprinc1s() {
        return this.actprinc1s;
    }

    public void setActprinc1s(Set<ActivitatiPrincipale> activitatiPrincipales) {
        this.actprinc1s = activitatiPrincipales;
    }

    public Sediul actprinc1s(Set<ActivitatiPrincipale> activitatiPrincipales) {
        this.setActprinc1s(activitatiPrincipales);
        return this;
    }

    public Sediul addActprinc1(ActivitatiPrincipale activitatiPrincipale) {
        this.actprinc1s.add(activitatiPrincipale);
        activitatiPrincipale.getSediulxes().add(this);
        return this;
    }

    public Sediul removeActprinc1(ActivitatiPrincipale activitatiPrincipale) {
        this.actprinc1s.remove(activitatiPrincipale);
        activitatiPrincipale.getSediulxes().remove(this);
        return this;
    }

    public Set<ActivitatiSecundare> getActprinc2s() {
        return this.actprinc2s;
    }

    public void setActprinc2s(Set<ActivitatiSecundare> activitatiSecundares) {
        this.actprinc2s = activitatiSecundares;
    }

    public Sediul actprinc2s(Set<ActivitatiSecundare> activitatiSecundares) {
        this.setActprinc2s(activitatiSecundares);
        return this;
    }

    public Sediul addActprinc2(ActivitatiSecundare activitatiSecundare) {
        this.actprinc2s.add(activitatiSecundare);
        activitatiSecundare.getSediulies().add(this);
        return this;
    }

    public Sediul removeActprinc2(ActivitatiSecundare activitatiSecundare) {
        this.actprinc2s.remove(activitatiSecundare);
        activitatiSecundare.getSediulies().remove(this);
        return this;
    }

    public Srl getSrl4() {
        return this.srl4;
    }

    public void setSrl4(Srl srl) {
        this.srl4 = srl;
    }

    public Sediul srl4(Srl srl) {
        this.setSrl4(srl);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sediul)) {
            return false;
        }
        return id != null && id.equals(((Sediul) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sediul{" +
            "id=" + getId() +
            ", sediusocialPunctLucru='" + getSediusocialPunctLucru() + "'" +
            "}";
    }
}
