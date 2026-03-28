-- Migration: Add created_at timestamps and performance indexes
-- Run: psql -U postgres -d campus_skill_exchange -f backend/migration_indexes_timestamps.sql

-- =============================================
-- 1. Add created_at columns with defaults
-- =============================================

-- USER table
ALTER TABLE "USER"
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- SKILL table
ALTER TABLE SKILL
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- SERVICE_REQUEST table
ALTER TABLE SERVICE_REQUEST
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- =============================================
-- 2. Add indexes on frequently queried columns
-- =============================================

-- USER lookups by email (login)
CREATE INDEX IF NOT EXISTS idx_user_email ON "USER"(email);

-- USER_SKILL lookups by user_id (provider's skills)
CREATE INDEX IF NOT EXISTS idx_user_skill_user ON USER_SKILL(user_id);

-- USER_SKILL lookups by skill_id (who offers a skill)
CREATE INDEX IF NOT EXISTS idx_user_skill_skill ON USER_SKILL(skill_id);

-- SERVICE_REQUEST lookups by requester
CREATE INDEX IF NOT EXISTS idx_request_requester ON SERVICE_REQUEST(requester_id);

-- SERVICE_REQUEST lookups by skill
CREATE INDEX IF NOT EXISTS idx_request_skill ON SERVICE_REQUEST(skill_id);

-- SERVICE_REQUEST filter by status
CREATE INDEX IF NOT EXISTS idx_request_status ON SERVICE_REQUEST(status);

-- SERVICE_ASSIGNMENT lookups by provider
CREATE INDEX IF NOT EXISTS idx_assignment_provider ON SERVICE_ASSIGNMENT(provider_id);

-- SERVICE_ASSIGNMENT lookups by request (already UNIQUE, but explicit)
CREATE INDEX IF NOT EXISTS idx_assignment_request ON SERVICE_ASSIGNMENT(request_id);

-- SKILL lookups by category
CREATE INDEX IF NOT EXISTS idx_skill_category ON SKILL(category_id);
