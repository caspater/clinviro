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
import {strictlyTestName,
        messages as nameMessages} from '../../utils/validators/human-names';

export function validateFullname(value, required) {
  const messages = [];
  const trimedValue = value.replace(/^[ ,]+|[ ,]+$/g, '');
  if (required && trimedValue.indexOf(',') === -1) {
    messages.push({
      text: <span>
        This field is required
        in <em>Lastname, Firstname</em> format.
      </span>,
      level: 'error'
    });
  }
  if (!strictlyTestName(value)) {
    messages.push(nameMessages.strictlyTestName);
  }
  return messages;
}

export function checkRequired(value, required, message = null) {
  message = message || 'This field is required.';
  const messages = [];
  if (required && !value) {
    messages.push({
      text: message,
      level: 'error'
    });
  }
  return messages;
}
