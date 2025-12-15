"""merge 3953b18e5e81 and 74e5c09fd4fb

Revision ID: 371ef8351f22
Revises: 3953b18e5e81, 74e5c09fd4fb
Create Date: 2025-12-13 16:38:37.304306

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '371ef8351f22'
down_revision: Union[str, None] = ('3953b18e5e81', '74e5c09fd4fb')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
