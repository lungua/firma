package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AsocAdmin.
 */
@Entity
@Table(name = "asoc_admin")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AsocAdmin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "persoana_fizica")
    private Boolean persoanaFizica;

    @Column(name = "asociat")
    private Boolean asociat;

    @OneToMany(mappedBy = "asocadmin1")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "asocadmin1" }, allowSetters = true)
    private Set<Buletin> buletins = new HashSet<>();

    @OneToMany(mappedBy = "asocadmin2")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "asocadmin2" }, allowSetters = true)
    private Set<DateSocietate> datesocietates = new HashSet<>();

    @OneToMany(mappedBy = "asocadmin3")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "asocadmin3" }, allowSetters = true)
    private Set<Domiciliul> domiciliuls = new HashSet<>();

    @OneToMany(mappedBy = "asocadmin4")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "asocadmin4" }, allowSetters = true)
    private Set<DateAsociati> dateasociatis = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(
        value = {
            "inregistratDe", "asocadmins", "capitalsocials", "alteactivitatis", "activitatiprincipales", "activitatisecundares", "sedius",
        },
        allowSetters = true
    )
    private Srl srl;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AsocAdmin id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getPersoanaFizica() {
        return this.persoanaFizica;
    }

    public AsocAdmin persoanaFizica(Boolean persoanaFizica) {
        this.setPersoanaFizica(persoanaFizica);
        return this;
    }

    public void setPersoanaFizica(Boolean persoanaFizica) {
        this.persoanaFizica = persoanaFizica;
    }

    public Boolean getAsociat() {
        return this.asociat;
    }

    public AsocAdmin asociat(Boolean asociat) {
        this.setAsociat(asociat);
        return this;
    }

    public void setAsociat(Boolean asociat) {
        this.asociat = asociat;
    }

    public Set<Buletin> getBuletins() {
        return this.buletins;
    }

    public void setBuletins(Set<Buletin> buletins) {
        if (this.buletins != null) {
            this.buletins.forEach(i -> i.setAsocadmin1(null));
        }
        if (buletins != null) {
            buletins.forEach(i -> i.setAsocadmin1(this));
        }
        this.buletins = buletins;
    }

    public AsocAdmin buletins(Set<Buletin> buletins) {
        this.setBuletins(buletins);
        return this;
    }

    public AsocAdmin addBuletin(Buletin buletin) {
        this.buletins.add(buletin);
        buletin.setAsocadmin1(this);
        return this;
    }

    public AsocAdmin removeBuletin(Buletin buletin) {
        this.buletins.remove(buletin);
        buletin.setAsocadmin1(null);
        return this;
    }

    public Set<DateSocietate> getDatesocietates() {
        return this.datesocietates;
    }

    public void setDatesocietates(Set<DateSocietate> dateSocietates) {
        if (this.datesocietates != null) {
            this.datesocietates.forEach(i -> i.setAsocadmin2(null));
        }
        if (dateSocietates != null) {
            dateSocietates.forEach(i -> i.setAsocadmin2(this));
        }
        this.datesocietates = dateSocietates;
    }

    public AsocAdmin datesocietates(Set<DateSocietate> dateSocietates) {
        this.setDatesocietates(dateSocietates);
        return this;
    }

    public AsocAdmin addDatesocietate(DateSocietate dateSocietate) {
        this.datesocietates.add(dateSocietate);
        dateSocietate.setAsocadmin2(this);
        return this;
    }

    public AsocAdmin removeDatesocietate(DateSocietate dateSocietate) {
        this.datesocietates.remove(dateSocietate);
        dateSocietate.setAsocadmin2(null);
        return this;
    }

    public Set<Domiciliul> getDomiciliuls() {
        return this.domiciliuls;
    }

    public void setDomiciliuls(Set<Domiciliul> domiciliuls) {
        if (this.domiciliuls != null) {
            this.domiciliuls.forEach(i -> i.setAsocadmin3(null));
        }
        if (domiciliuls != null) {
            domiciliuls.forEach(i -> i.setAsocadmin3(this));
        }
        this.domiciliuls = domiciliuls;
    }

    public AsocAdmin domiciliuls(Set<Domiciliul> domiciliuls) {
        this.setDomiciliuls(domiciliuls);
        return this;
    }

    public AsocAdmin addDomiciliul(Domiciliul domiciliul) {
        this.domiciliuls.add(domiciliul);
        domiciliul.setAsocadmin3(this);
        return this;
    }

    public AsocAdmin removeDomiciliul(Domiciliul domiciliul) {
        this.domiciliuls.remove(domiciliul);
        domiciliul.setAsocadmin3(null);
        return this;
    }

    public Set<DateAsociati> getDateasociatis() {
        return this.dateasociatis;
    }

    public void setDateasociatis(Set<DateAsociati> dateAsociatis) {
        if (this.dateasociatis != null) {
            this.dateasociatis.forEach(i -> i.setAsocadmin4(null));
        }
        if (dateAsociatis != null) {
            dateAsociatis.forEach(i -> i.setAsocadmin4(this));
        }
        this.dateasociatis = dateAsociatis;
    }

    public AsocAdmin dateasociatis(Set<DateAsociati> dateAsociatis) {
        this.setDateasociatis(dateAsociatis);
        return this;
    }

    public AsocAdmin addDateasociati(DateAsociati dateAsociati) {
        this.dateasociatis.add(dateAsociati);
        dateAsociati.setAsocadmin4(this);
        return this;
    }

    public AsocAdmin removeDateasociati(DateAsociati dateAsociati) {
        this.dateasociatis.remove(dateAsociati);
        dateAsociati.setAsocadmin4(null);
        return this;
    }

    public Srl getSrl() {
        return this.srl;
    }

    public void setSrl(Srl srl) {
        this.srl = srl;
    }

    public AsocAdmin srl(Srl srl) {
        this.setSrl(srl);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AsocAdmin)) {
            return false;
        }
        return id != null && id.equals(((AsocAdmin) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AsocAdmin{" +
            "id=" + getId() +
            ", persoanaFizica='" + getPersoanaFizica() + "'" +
            ", asociat='" + getAsociat() + "'" +
            "}";
    }
}
