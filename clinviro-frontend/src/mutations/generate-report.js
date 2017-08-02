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

import Relay from 'react-relay/classic';

export default class GenerateReport extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation { generateReport }`;
  }

  getVariables() {
    const {type, uid, isRegeneratedReport} = this.props;
    return {type, uid, isRegeneratedReport};
  }

  getFatQuery() {
    return Relay.QL`
      fragment on GenerateReportPayload {
        patientSample {
          id
        }
        proficiencySample {
          id
        }
        positiveControl {
          id
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on GenerateReportPayload {
            patientSample {
              id
            }
            proficiencySample {
              id
            }
            positiveControl {
              id
            }
          }
        `
      ]
    }];
  }
}
