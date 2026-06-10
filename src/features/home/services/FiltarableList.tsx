import React, { useState, useEffect, useMemo } from "react";
import type { SingleGame } from "./components/GameCard";
function FiltarableList() {
  const [games, setGames] = useState<SingleGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
}
