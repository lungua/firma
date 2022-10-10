package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AlteActivitatiTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlteActivitati.class);
        AlteActivitati alteActivitati1 = new AlteActivitati();
        alteActivitati1.setId(1L);
        AlteActivitati alteActivitati2 = new AlteActivitati();
        alteActivitati2.setId(alteActivitati1.getId());
        assertThat(alteActivitati1).isEqualTo(alteActivitati2);
        alteActivitati2.setId(2L);
        assertThat(alteActivitati1).isNotEqualTo(alteActivitati2);
        alteActivitati1.setId(null);
        assertThat(alteActivitati1).isNotEqualTo(alteActivitati2);
    }
}
