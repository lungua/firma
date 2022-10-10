package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ActivitatiPrincipaleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ActivitatiPrincipale.class);
        ActivitatiPrincipale activitatiPrincipale1 = new ActivitatiPrincipale();
        activitatiPrincipale1.setId(1L);
        ActivitatiPrincipale activitatiPrincipale2 = new ActivitatiPrincipale();
        activitatiPrincipale2.setId(activitatiPrincipale1.getId());
        assertThat(activitatiPrincipale1).isEqualTo(activitatiPrincipale2);
        activitatiPrincipale2.setId(2L);
        assertThat(activitatiPrincipale1).isNotEqualTo(activitatiPrincipale2);
        activitatiPrincipale1.setId(null);
        assertThat(activitatiPrincipale1).isNotEqualTo(activitatiPrincipale2);
    }
}
