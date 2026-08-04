// KDXR 88.1 "The Owl" — the 2 AM call sweep.
//
// Two lines light up around 2 AM, in the same order most nights. This file
// answers them. Like last week, you don't have to change anything in here —
// but DO run it, because tonight's program can be crashed from the keyboard,
// and finding out how is Task 1.
//
// Run it with:   dotnet run --project Lab

Console.WriteLine("+------------------------------------------+");
Console.WriteLine("|  KDXR 88.1 FM . THE OWL . overnight desk |");
Console.WriteLine("+------------------------------------------+");
Console.WriteLine();

Console.Write("DJ on duty: ");
string djName = Console.ReadLine() ?? "somebody";
Console.WriteLine(Broadcast.SignOn(djName));
Console.WriteLine();

// ── Line 1: a request ──────────────────────────────────────────────
Console.WriteLine("Line 1. Somebody's up.");
Console.Write("  Caller's name (just Enter if they won't say): ");
string? caller = Console.ReadLine();

Console.Write("  What do they want to hear? ");
string? request = Console.ReadLine();

Console.WriteLine($"  On air: {CallerLine.TakeRequest(caller, request)}");
Console.WriteLine();

// ── Line 2: it's Ray ───────────────────────────────────────────────
Console.WriteLine("Line 2. It's Ray.");
Console.Write("  Where's he at? ");
string? marker = Console.ReadLine();

Console.WriteLine($"  Log: {CallerLine.WhereIsRay(marker)}");
Console.WriteLine();

Console.WriteLine("Both lines quiet. Back to the music.");
