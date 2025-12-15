"""add better auth tables

Revision ID: 74e5c09fd4fb
Revises: 697135a82a6e
Create Date: 2025-12-13 16:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '74e5c09fd4fb'
down_revision: Union[str, None] = '697135a82a6e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Create 'session' table
    op.create_table('session',
        sa.Column('id', sa.Text, primary_key=True),
        sa.Column('expiresAt', sa.DateTime, nullable=False),
        sa.Column('token', sa.Text, nullable=False, unique=True),
        sa.Column('createdAt', sa.DateTime, nullable=False),
        sa.Column('updatedAt', sa.DateTime, nullable=False),
        sa.Column('ipAddress', sa.Text, nullable=True),
        sa.Column('userAgent', sa.Text, nullable=True),
        sa.Column('userId', sa.Text, nullable=False),
        sa.ForeignKeyConstraint(['userId'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # 2. Create 'account' table
    op.create_table('account',
        sa.Column('id', sa.Text, primary_key=True),
        sa.Column('accountId', sa.Text, nullable=False),
        sa.Column('providerId', sa.Text, nullable=False),
        sa.Column('userId', sa.Text, nullable=False),
        sa.Column('accessToken', sa.Text, nullable=True),
        sa.Column('refreshToken', sa.Text, nullable=True),
        sa.Column('idToken', sa.Text, nullable=True),
        sa.Column('accessTokenExpiresAt', sa.DateTime, nullable=True),
        sa.Column('refreshTokenExpiresAt', sa.DateTime, nullable=True),
        sa.Column('scope', sa.Text, nullable=True),
        sa.Column('password', sa.Text, nullable=True),
        sa.Column('createdAt', sa.DateTime, nullable=False),
        sa.Column('updatedAt', sa.DateTime, nullable=False),
        sa.ForeignKeyConstraint(['userId'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    
    # 3. Create 'verification' table
    op.create_table('verification',
        sa.Column('id', sa.Text, primary_key=True),
        sa.Column('identifier', sa.Text, nullable=False),
        sa.Column('value', sa.Text, nullable=False),
        sa.Column('expiresAt', sa.DateTime, nullable=False),
        sa.Column('createdAt', sa.DateTime, nullable=True),
        sa.Column('updatedAt', sa.DateTime, nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # 4. Add missing columns to 'user' table
    # Only add if they don't exist - usually Alembic ops are unconditional but we use it for sync
    # Checking existing columns would be complex here, so we assume standard Better Auth schema needs these
    op.add_column('user', sa.Column('emailVerified', sa.Boolean(), nullable=False, server_default='false'))
    op.add_column('user', sa.Column('name', sa.Text(), nullable=False))
    op.add_column('user', sa.Column('image', sa.Text(), nullable=True))
    op.add_column('user', sa.Column('createdAt', sa.DateTime(), nullable=False))
    op.add_column('user', sa.Column('updatedAt', sa.DateTime(), nullable=False))

    # 5. Create 'jwks' table (optional but good for auth)
    op.create_table('jwks',
        sa.Column('id', sa.Text, primary_key=True),
        sa.Column('publicKey', sa.Text, nullable=False),
        sa.Column('privateKey', sa.Text, nullable=False),
        sa.Column('createdAt', sa.DateTime, nullable=False),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    op.drop_table('jwks')
    op.drop_column('user', 'updatedAt')
    op.drop_column('user', 'createdAt')
    op.drop_column('user', 'image')
    op.drop_column('user', 'name')
    op.drop_column('user', 'emailVerified')
    op.drop_table('verification')
    op.drop_table('account')
    op.drop_table('session')
