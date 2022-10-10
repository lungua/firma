package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ActivitatiSecundareTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ActivitatiSecundare.class);
        ActivitatiSecundare activitatiSecundare1 = new ActivitatiSecundare();
        activitatiSecundare1.setId(1L);
        ActivitatiSecundare activitatiSecundare2 = new ActivitatiSecundare();
        activitatiSecundare2.setId(activitatiSecundare1.getId());
        assertThat(activitatiSecundare1).isEqualTo(activitatiSecundare2);
        activitatiSecundare2.setId(2L);
        assertThat(activitatiSecundare1).isNotEqualTo(activitatiSecundare2);
        activitatiSecundare1.setId(null);
        assertThat(activitatiSecundare1).isNotEqualTo(activitatiSecundare2);
    }
}
