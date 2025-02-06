CREATE IF NOT EXISTS TABLE rates (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    price REAL NOT NULL,
    date DATE NOT NULL
)
