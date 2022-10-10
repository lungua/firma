package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Srl.
 */
@Entity
@Table(name = "srl")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Srl implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nume_1")
    private String nume1;

    @Column(name = "nume_2")
    private String nume2;

    @Column(name = "nume_3")
    private String nume3;

    @Column(name = "nume_societate")
    private String numeSocietate;

    @Column(name = "nune_final")
    private Boolean nuneFinal;

    @Column(name = "data_inregistrare")
    private Instant dataInregistrare;

    @OneToOne
    @JoinColumn(unique = true)
    private User inregistratDe;

    //    @OneToMany(mappedBy = "srl")
    //    //@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    //    //@JsonIgnoreProperties(value = { "srl" }, allowSetters = true)
    //    private Set<AsocAdmin> asocadmins = new HashSet<>();

    @OneToMany(mappedBy = "srl")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "buletins", "datesocietates", "domiciliuls", "dateasociatis", "srl" }, allowSetters = true)
    private Set<AsocAdmin> asocadmins = new HashSet<>();

    @OneToMany(mappedBy = "srl1")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "srl1" }, allowSetters = true)
    private Set<CapitalSocial> capitalsocials = new HashSet<>();

    @OneToMany(mappedBy = "srl2")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "srl2" }, allowSetters = true)
    private Set<AlteActivitati> alteactivitatis = new HashSet<>();

    @OneToMany(mappedBy = "srl3")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "srl3", "sediulxes" }, allowSetters = true)
    private Set<ActivitatiPrincipale> activitatiprincipales = new HashSet<>();

    @OneToMany(mappedBy = "srl5")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "srl5", "sediulies" }, allowSetters = true)
    private Set<ActivitatiSecundare> activitatisecundares = new HashSet<>();

    @OneToMany(mappedBy = "srl4")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "adresas", "dovadas", "proprietaris", "actprinc1s", "actprinc2s", "srl4" }, allowSetters = true)
    private Set<Sediul> sedius = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Srl id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNume1() {
        return this.nume1;
    }

    public Srl nume1(String nume1) {
        this.setNume1(nume1);
        return this;
    }

    public void setNume1(String nume1) {
        this.nume1 = nume1;
    }

    public String getNume2() {
        return this.nume2;
    }

    public Srl nume2(String nume2) {
        this.setNume2(nume2);
        return this;
    }

    public void setNume2(String nume2) {
        this.nume2 = nume2;
    }

    public String getNume3() {
        return this.nume3;
    }

    public Srl nume3(String nume3) {
        this.setNume3(nume3);
        return this;
    }

    public void setNume3(String nume3) {
        this.nume3 = nume3;
    }

    public String getNumeSocietate() {
        return this.numeSocietate;
    }

    public Srl numeSocietate(String numeSocietate) {
        this.setNumeSocietate(numeSocietate);
        return this;
    }

    public void setNumeSocietate(String numeSocietate) {
        this.numeSocietate = numeSocietate;
    }

    public Boolean getNuneFinal() {
        return this.nuneFinal;
    }

    public Srl nuneFinal(Boolean nuneFinal) {
        this.setNuneFinal(nuneFinal);
        return this;
    }

    public void setNuneFinal(Boolean nuneFinal) {
        this.nuneFinal = nuneFinal;
    }

    public Instant getDataInregistrare() {
        return this.dataInregistrare;
    }

    public Srl dataInregistrare(Instant dataInregistrare) {
        this.setDataInregistrare(dataInregistrare);
        return this;
    }

    public void setDataInregistrare(Instant dataInregistrare) {
        this.dataInregistrare = dataInregistrare;
    }

    public User getInregistratDe() {
        return this.inregistratDe;
    }

    public void setInregistratDe(User user) {
        this.inregistratDe = user;
    }

    public Srl inregistratDe(User user) {
        this.setInregistratDe(user);
        return this;
    }

    public Set<AsocAdmin> getAsocadmins() {
        return this.asocadmins;
    }

    public void setAsocadmins(Set<AsocAdmin> asocAdmins) {
        if (this.asocadmins != null) {
            this.asocadmins.forEach(i -> i.setSrl(null));
        }
        if (asocAdmins != null) {
            asocAdmins.forEach(i -> i.setSrl(this));
        }
        this.asocadmins = asocAdmins;
    }

    public Srl asocadmins(Set<AsocAdmin> asocAdmins) {
        this.setAsocadmins(asocAdmins);
        return this;
    }

    public Srl addAsocadmin(AsocAdmin asocAdmin) {
        this.asocadmins.add(asocAdmin);
        asocAdmin.setSrl(this);
        return this;
    }

    public Srl removeAsocadmin(AsocAdmin asocAdmin) {
        this.asocadmins.remove(asocAdmin);
        asocAdmin.setSrl(null);
        return this;
    }

    public Set<CapitalSocial> getCapitalsocials() {
        return this.capitalsocials;
    }

    public void setCapitalsocials(Set<CapitalSocial> capitalSocials) {
        if (this.capitalsocials != null) {
            this.capitalsocials.forEach(i -> i.setSrl1(null));
        }
        if (capitalSocials != null) {
            capitalSocials.forEach(i -> i.setSrl1(this));
        }
        this.capitalsocials = capitalSocials;
    }

    public Srl capitalsocials(Set<CapitalSocial> capitalSocials) {
        this.setCapitalsocials(capitalSocials);
        return this;
    }

    public Srl addCapitalsocial(CapitalSocial capitalSocial) {
        this.capitalsocials.add(capitalSocial);
        capitalSocial.setSrl1(this);
        return this;
    }

    public Srl removeCapitalsocial(CapitalSocial capitalSocial) {
        this.capitalsocials.remove(capitalSocial);
        capitalSocial.setSrl1(null);
        return this;
    }

    public Set<AlteActivitati> getAlteactivitatis() {
        return this.alteactivitatis;
    }

    public void setAlteactivitatis(Set<AlteActivitati> alteActivitatis) {
        if (this.alteactivitatis != null) {
            this.alteactivitatis.forEach(i -> i.setSrl2(null));
        }
        if (alteActivitatis != null) {
            alteActivitatis.forEach(i -> i.setSrl2(this));
        }
        this.alteactivitatis = alteActivitatis;
    }

    public Srl alteactivitatis(Set<AlteActivitati> alteActivitatis) {
        this.setAlteactivitatis(alteActivitatis);
        return this;
    }

    public Srl addAlteactivitati(AlteActivitati alteActivitati) {
        this.alteactivitatis.add(alteActivitati);
        alteActivitati.setSrl2(this);
        return this;
    }

    public Srl removeAlteactivitati(AlteActivitati alteActivitati) {
        this.alteactivitatis.remove(alteActivitati);
        alteActivitati.setSrl2(null);
        return this;
    }

    public Set<ActivitatiPrincipale> getActivitatiprincipales() {
        return this.activitatiprincipales;
    }

    public void setActivitatiprincipales(Set<ActivitatiPrincipale> activitatiPrincipales) {
        if (this.activitatiprincipales != null) {
            this.activitatiprincipales.forEach(i -> i.setSrl3(null));
        }
        if (activitatiPrincipales != null) {
            activitatiPrincipales.forEach(i -> i.setSrl3(this));
        }
        this.activitatiprincipales = activitatiPrincipales;
    }

    public Srl activitatiprincipales(Set<ActivitatiPrincipale> activitatiPrincipales) {
        this.setActivitatiprincipales(activitatiPrincipales);
        return this;
    }

    public Srl addActivitatiprincipale(ActivitatiPrincipale activitatiPrincipale) {
        this.activitatiprincipales.add(activitatiPrincipale);
        activitatiPrincipale.setSrl3(this);
        return this;
    }

    public Srl removeActivitatiprincipale(ActivitatiPrincipale activitatiPrincipale) {
        this.activitatiprincipales.remove(activitatiPrincipale);
        activitatiPrincipale.setSrl3(null);
        return this;
    }

    public Set<ActivitatiSecundare> getActivitatisecundares() {
        return this.activitatisecundares;
    }

    public void setActivitatisecundares(Set<ActivitatiSecundare> activitatiSecundares) {
        if (this.activitatisecundares != null) {
            this.activitatisecundares.forEach(i -> i.setSrl5(null));
        }
        if (activitatiSecundares != null) {
            activitatiSecundares.forEach(i -> i.setSrl5(this));
        }
        this.activitatisecundares = activitatiSecundares;
    }

    public Srl activitatisecundares(Set<ActivitatiSecundare> activitatiSecundares) {
        this.setActivitatisecundares(activitatiSecundares);
        return this;
    }

    public Srl addActivitatisecundare(ActivitatiSecundare activitatiSecundare) {
        this.activitatisecundares.add(activitatiSecundare);
        activitatiSecundare.setSrl5(this);
        return this;
    }

    public Srl removeActivitatisecundare(ActivitatiSecundare activitatiSecundare) {
        this.activitatisecundares.remove(activitatiSecundare);
        activitatiSecundare.setSrl5(null);
        return this;
    }

    public Set<Sediul> getSedius() {
        return this.sedius;
    }

    public void setSedius(Set<Sediul> sediuls) {
        if (this.sedius != null) {
            this.sedius.forEach(i -> i.setSrl4(null));
        }
        if (sediuls != null) {
            sediuls.forEach(i -> i.setSrl4(this));
        }
        this.sedius = sediuls;
    }

    public Srl sedius(Set<Sediul> sediuls) {
        this.setSedius(sediuls);
        return this;
    }

    public Srl addSediu(Sediul sediul) {
        this.sedius.add(sediul);
        sediul.setSrl4(this);
        return this;
    }

    public Srl removeSediu(Sediul sediul) {
        this.sedius.remove(sediul);
        sediul.setSrl4(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Srl)) {
            return false;
        }
        return id != null && id.equals(((Srl) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Srl{" +
            "id=" + getId() +
            ", nume1='" + getNume1() + "'" +
            ", nume2='" + getNume2() + "'" +
            ", nume3='" + getNume3() + "'" +
            ", numeSocietate='" + getNumeSocietate() + "'" +
            ", nuneFinal='" + getNuneFinal() + "'" +
            ", dataInregistrare='" + getDataInregistrare() + "'" +
            "}";
    }
}
