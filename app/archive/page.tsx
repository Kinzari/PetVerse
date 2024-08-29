"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {
    Bell,
    CircleUser,
    Home,
    Menu,
    PawPrint,
    Plus,
    Filter,
    Archive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ArchivePage() {
    const [archivedPets, setArchivedPets] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get("http://localhost/petversedata/fetch_archived_pets.php")
            .then((response) => {
                if (response.data.success) {
                    setArchivedPets(response.data.pets);
                } else {
                    console.error("Failed to fetch archived pets:", response.data.error);
                }
            })
            .catch((error) => {
                console.error("Error fetching archived pets:", error);
            });
    }, []);

    const handleRestorePet = async (petID) => {
        try {
            const response = await axios.post('http://localhost/petversedata/restore_pet.php', { petID });
            if (response.data.success) {
                setArchivedPets(archivedPets.filter(pet => pet.PetID !== petID)); // Remove the pet from the archived list
                router.push('/dataentry'); // Redirect to /dataentry page
            } else {
                console.error('Failed to restore pet:', response.data.error);
            }
        } catch (error) {
            console.error('Error restoring pet:', error);
        }
    };

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/petverse" className="flex items-center gap-2 font-semibold">
                            <PawPrint className="h-6 w-6" />
                            <span className="">PetVerse</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <Home className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link href="/dataentry" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <Plus className="h-4 w-4" />
                                Data Entry
                            </Link>
                            <Link href="/archive" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                                <Archive className="h-4 w-4" />
                                Archive
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col bg-white">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link href="/petverse" className="flex items-center gap-2 text-lg font-semibold">
                                    <PawPrint className="h-6 w-6" />
                                    <span className="">PetVerse</span>
                                </Link>
                                <Link href="/dashboard" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link href="/dataentry" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                                    <Plus className="h-5 w-5" />
                                    Data Entry
                                </Link>
                                <Link href="/archive" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
                                    <Archive className="h-5 w-5" />
                                    Archive
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1"></div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push('/signin')}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold md:text-2xl">Archived Pets</h1>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Archived Pet List</CardTitle>
                            <CardDescription>View all archived pets</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Owner&apos;s Name</TableHead>
                                        <TableHead>Pet Name</TableHead>
                                        <TableHead>Species</TableHead>
                                        <TableHead>Breed</TableHead>
                                        <TableHead>Date of Birth</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {archivedPets.map((pet, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{pet.OwnerName}</TableCell>
                                            <TableCell>{pet.PetName}</TableCell>
                                            <TableCell>{pet.SpeciesName}</TableCell>
                                            <TableCell>{pet.BreedName}</TableCell>
                                            <TableCell>
                                                {pet.DateOfBirth ? format(new Date(pet.DateOfBirth), "PPP") : "Invalid Date"}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleRestorePet(pet.PetID)}
                                                >
                                                    Restore
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
