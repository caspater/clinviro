/**
 * ClinViro
 * Copyright (C) 2017 Stanford HIVDB team.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import style from '../style.css';


export default class SequenceSummarySection extends React.Component {

  render() {
    const {
      amplifiable, report_type, sequence,
      previous_sequences_count, indels,
      similar_sequences
    } = this.props;

    if (!amplifiable) {
      return null;
    }
    const {gene_sequences, subtype} = sequence;
    const numIndels = indels.length;
    return <section className={style.reportSection}>
      <table className={style.keywordTable}>
        <tbody>
          {gene_sequences.map(({gene, first_aa, last_aa}, idx) => (
            <tr key={idx}>
              <th>Sequence includes {gene} codons:</th>
              <td>{first_aa} - {last_aa}</td>
            </tr>
          ))}
          {report_type === 'patient' ?
            <tr>
              <th># of previous sequences from same person:</th>
              <td>{Object.entries(previous_sequences_count)
                .map(([gene, count]) => `${gene}: ${count}`)
                .join('; ')}</td>
            </tr>
            : null}
          <tr>
            <th># of similar sequences from other persons:</th>
            <td>{similar_sequences.length}</td>
          </tr>
          {numIndels > 0 ?
            <tr>
              <th>Sequence contains {numIndels} indel mutation{numIndels > 1 ? 's' : null}:</th>
              <td>{indels.join(', ')}</td>
            </tr> :
            <tr>
              <th>Indel mutations:</th>
              <td>There is no indel mutation in this sequence</td>
            </tr>}
          <tr><th>Subtype:</th><td>{subtype}</td></tr>
        </tbody>
      </table>
    </section>;
  }
}
