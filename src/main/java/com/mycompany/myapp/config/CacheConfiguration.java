package com.mycompany.myapp.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.mycompany.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.mycompany.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.mycompany.myapp.domain.User.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Authority.class.getName());
            createCache(cm, com.mycompany.myapp.domain.User.class.getName() + ".authorities");
            createCache(cm, com.mycompany.myapp.domain.Srl.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Srl.class.getName() + ".asocadmins");
            createCache(cm, com.mycompany.myapp.domain.Srl.class.getName() + ".capitalsocials");
            createCache(cm, com.mycompany.myapp.domain.Srl.class.getName() + ".alteactivitatis");
            createCache(cm, com.mycompany.myapp.domain.Srl.class.getName() + ".activitatiprincipales");
            createCache(cm, com.mycompany.myapp.domain.Srl.class.getName() + ".activitatisecundares");
            createCache(cm, com.mycompany.myapp.domain.Srl.class.getName() + ".sedius");
            createCache(cm, com.mycompany.myapp.domain.Srl.class.getName() + ".sumaincasatas");
            createCache(cm, com.mycompany.myapp.domain.SumaIncasata.class.getName());
            createCache(cm, com.mycompany.myapp.domain.AsocAdmin.class.getName());
            createCache(cm, com.mycompany.myapp.domain.AsocAdmin.class.getName() + ".buletins");
            createCache(cm, com.mycompany.myapp.domain.AsocAdmin.class.getName() + ".datesocietates");
            createCache(cm, com.mycompany.myapp.domain.AsocAdmin.class.getName() + ".domiciliuls");
            createCache(cm, com.mycompany.myapp.domain.AsocAdmin.class.getName() + ".dateasociatis");
            createCache(cm, com.mycompany.myapp.domain.Buletin.class.getName());
            createCache(cm, com.mycompany.myapp.domain.DateSocietate.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Domiciliul.class.getName());
            createCache(cm, com.mycompany.myapp.domain.DateAsociati.class.getName());
            createCache(cm, com.mycompany.myapp.domain.CapitalSocial.class.getName());
            createCache(cm, com.mycompany.myapp.domain.AlteActivitati.class.getName());
            createCache(cm, com.mycompany.myapp.domain.ActivitatiPrincipale.class.getName());
            createCache(cm, com.mycompany.myapp.domain.ActivitatiPrincipale.class.getName() + ".sediulxes");
            createCache(cm, com.mycompany.myapp.domain.ActivitatiSecundare.class.getName());
            createCache(cm, com.mycompany.myapp.domain.ActivitatiSecundare.class.getName() + ".sediulies");
            createCache(cm, com.mycompany.myapp.domain.Sediul.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Sediul.class.getName() + ".adresas");
            createCache(cm, com.mycompany.myapp.domain.Sediul.class.getName() + ".dovadas");
            createCache(cm, com.mycompany.myapp.domain.Sediul.class.getName() + ".proprietaris");
            createCache(cm, com.mycompany.myapp.domain.Sediul.class.getName() + ".actprinc1s");
            createCache(cm, com.mycompany.myapp.domain.Sediul.class.getName() + ".actprinc2s");
            createCache(cm, com.mycompany.myapp.domain.Adresa.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Dovada.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Proprietari.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
