﻿using Domain.Abstractions;

namespace Domain.Common;

public abstract class Entity: IEntity
{
    public Guid Id { get; init; }

    public override bool Equals(object? other)
    {
        if (other is null || other.GetType() != GetType())
        {
            return false;
        }

        return ((Entity)other).Id == Id;
    }

    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }

    protected Entity(Guid id) => Id = id;

    protected Entity() { }
}