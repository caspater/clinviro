# ClinViro
# Copyright (C) 2017 Stanford HIVDB team.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

from flask import current_app as app

from graphene.types.json import JSONString
from graphene.types.datetime import DateTime
from graphene_sqlalchemy.converter import convert_sqlalchemy_type
from depot.fields.sqlalchemy import UploadedFileField
from sqlalchemy_utils import ArrowType


@convert_sqlalchemy_type.register(app.db.Date)
@convert_sqlalchemy_type.register(app.db.DateTime)
def convert_column_to_datetime(type, column, registry=None):
    return DateTime(
        description=getattr(column, 'doc', None),
        required=not(getattr(column, 'nullable', True)))


@convert_sqlalchemy_type.register(UploadedFileField)
def convert_depot_column_to_string(type, column, registry=None):
    return JSONString(
        description=getattr(column, 'doc', None),
        required=not(getattr(column, 'nullable', True)))
