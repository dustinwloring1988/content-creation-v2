-- Create messages table (updated to remove reference to conversations)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create settings table
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    theme TEXT NOT NULL DEFAULT 'light',
    language TEXT NOT NULL DEFAULT 'en',
    tier TEXT NOT NULL DEFAULT 'free',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id)
);

-- Create user_contents table
CREATE TABLE user_contents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    prompt TEXT NOT NULL,
    content_type TEXT NOT NULL,
    style TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create functions to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update the updated_at column
-- Note: Removed trigger for conversations table
CREATE TRIGGER update_settings_modtime
BEFORE UPDATE ON settings
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_user_contents_modtime
BEFORE UPDATE ON user_contents
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Create indexes for better query performance
-- Note: Removed index for conversations table
CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_settings_user_id ON settings(user_id);
CREATE INDEX idx_user_contents_user_id ON user_contents(user_id);
-- Note: Removed index for user_contents(conversation_id)