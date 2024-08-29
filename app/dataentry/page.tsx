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
    Edit,
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
    const [pets, setPets] = useState([]);
    const [speciesList, setSpeciesList] = useState([]);
    const [breedList, setBreedList] = useState([]);
    const [newPet, setNewPet] = useState({
        ownerName: "",
        contactNumber: "",
        address: "",
        petName: "",
        speciesID: "",
        breedID: "",
        dateOfBirth: "",
    });

    const [editingPet, setEditingPet] = useState({
        PetID: "",
        OwnerName: "",
        PetName: "",
        SpeciesID: "",
        BreedID: "",
        DateOfBirth: ""
    });

    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [filteredBreeds, setFilteredBreeds] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false); // Managing dialog state

    const router = useRouter();

    const handleEditClick = (pet) => {
        setEditingPet({
            PetID: pet.PetID,
            OwnerName: pet.OwnerName,
            PetName: pet.PetName,
            SpeciesID: pet.SpeciesID,
            BreedID: pet.BreedID,
            DateOfBirth: pet.DateOfBirth
        });
    };

    const handleEditPet = async (petID) => {
        try {
            const response = await axios.post('http://localhost/petversedata/update_pet.php', {
                petID: petID,
                name: editingPet.PetName,
                speciesID: editingPet.SpeciesID,
                breedID: editingPet.BreedID,
                dateOfBirth: editingPet.DateOfBirth,
                ownerName: editingPet.OwnerName,
            });
            if (response.data.success) {
                setPets(pets.map(pet => (pet.PetID === petID ? editingPet : pet)));
            } else {
                console.error('Failed to update pet:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating pet:', error);
        }
    };

    const handleArchivePet = async (petID) => {
        try {
            const response = await axios.post('http://localhost/petversedata/archive_pet.php', { petID });
            if (response.data.success) {
                setPets(pets.filter(pet => pet.PetID !== petID));
            } else {
                console.error('Failed to archive pet:', response.data.error);
            }
        } catch (error) {
            console.error('Error archiving pet:', error);
        }
    };

    const handleAddPet = async () => {
        const petData = {
            ownerName: newPet.ownerName.trim(),
            contactNumber: newPet.contactNumber.trim(),
            address: newPet.address.trim(),
            petName: newPet.petName.trim(),
            speciesID: newPet.speciesID,
            breedID: newPet.breedID,
            dateOfBirth: newPet.dateOfBirth
        };

        console.log("Submitting Pet Data:", petData);

        try {
            const response = await axios.post('http://localhost/petversedata/add_pet.php', petData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                console.log("Pet added successfully:", response.data);
                setPets([...pets, response.data.pet]);  // Adjust this line to update your pets state
                setNewPet({ ownerName: "", contactNumber: "", address: "", petName: "", speciesID: "", breedID: "", dateOfBirth: "" });
                setDialogOpen(false);  // Ensure the dialog closes after successful submission
            } else {
                console.error("Failed to add pet:", response.data.error);
                alert(response.data.error);  // Show error to the user
            }
        } catch (error) {
            console.error('Error submitting pet data:', error);
            alert('Error submitting pet data. Please try again.');
        }
    };



    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const response = await axios.get('http://localhost/petversedata/fetch_species.php');
                if (response.data.success) {
                    setSpeciesList(response.data.species);
                } else {
                    console.error('Failed to fetch species:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching species:', error);
            }
        };

        const fetchBreeds = async () => {
            try {
                const response = await axios.get('http://localhost/petversedata/fetch_breeds.php');
                if (response.data.success) {
                    setBreedList(response.data.breeds);
                } else {
                    console.error('Failed to fetch breeds:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching breeds:', error);
            }
        };

        fetchSpecies();
        fetchBreeds();

        axios.get("http://localhost/petversedata/fetch_pets.php")
            .then((response) => {
                if (response.data.success) {
                    setPets(response.data.pets);
                } else {
                    console.error("Failed to fetch pets:", response.data.error);
                }
            })
            .catch((error) => {
                console.error("Error fetching pets:", error);
            });

        if (newPet.speciesID) {
            const filtered = breedList.filter(breed => breed.SpeciesID === newPet.speciesID);
            setFilteredBreeds(filtered);
        } else {
            setFilteredBreeds([]); // Clear breeds if no species is selected
        }
    }, [newPet.speciesID, breedList]);

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
                        <h1 className="text-lg font-semibold md:text-2xl">Pet Management</h1>
                        <div className="flex gap-2">
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="text-white bg-black" onClick={() => setDialogOpen(true)}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Pet
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-white">
                                    <DialogHeader>
                                        <DialogTitle>Add Pets</DialogTitle>
                                        <DialogDescription>
                                            Fill up the following details.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="owner-name" className="text-right">
                                                Owner&apos;s Name
                                            </Label>
                                            <Input
                                                id="owner-name"
                                                value={newPet.ownerName}
                                                onChange={(e) => setNewPet({ ...newPet, ownerName: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="contact-number" className="text-right">
                                                Contact Number
                                            </Label>
                                            <Input
                                                id="contact-number"
                                                value={newPet.contactNumber}
                                                onChange={(e) => setNewPet({ ...newPet, contactNumber: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="address" className="text-right">
                                                Address
                                            </Label>
                                            <Input
                                                id="address"
                                                value={newPet.address}
                                                onChange={(e) => setNewPet({ ...newPet, address: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="pet-name" className="text-right">
                                                Pet&apos;s Name
                                            </Label>
                                            <Input
                                                id="pet-name"
                                                value={newPet.petName}
                                                onChange={(e) => setNewPet({ ...newPet, petName: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="species" className="text-right">
                                                Species
                                            </Label>
                                            <Select
                                                onValueChange={(value) => {
                                                    setNewPet({ ...newPet, speciesID: value });
                                                    const filtered = breedList.filter(breed => breed.SpeciesID === value);
                                                    setFilteredBreeds(filtered);
                                                }}
                                                value={newPet.speciesID}
                                            >
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select Species" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectGroup>
                                                        {speciesList.map((species) => (
                                                            <SelectItem
                                                                key={species.SpeciesID}
                                                                value={species.SpeciesID}
                                                                className="hover:bg-gray-100 hover:text-black"
                                                            >
                                                                {species.SpeciesName}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="breed" className="text-right">
                                                Breed
                                            </Label>
                                            <Select
                                                onValueChange={(value) => setNewPet({ ...newPet, breedID: value })}
                                                value={newPet.breedID}
                                            >
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select Breed" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectGroup>
                                                        {filteredBreeds.map((breed) => (
                                                            <SelectItem
                                                                key={breed.BreedID}
                                                                value={breed.BreedID}
                                                                className="hover:bg-gray-100 hover:text-black"
                                                            >
                                                                {breed.BreedName}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="date-of-birth" className="text-right">
                                                Date of Birth
                                            </Label>
                                            <Input
                                                id="date-of-birth"
                                                type="date"
                                                value={newPet.dateOfBirth}
                                                onChange={(e) => setNewPet({ ...newPet, dateOfBirth: e.target.value })}
                                                className="col-span-3"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="button" onClick={handleAddPet}>
                                            Submit
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white">
                                    <DropdownMenuItem>Display by Owner</DropdownMenuItem>
                                    <DropdownMenuItem>Display by Breed</DropdownMenuItem>
                                    <DropdownMenuItem>Display by Species</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pet List</CardTitle>
                            <CardDescription>Manage and view all registered pets</CardDescription>
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
                                    {pets.map((pet, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{pet?.OwnerName || 'N/A'}</TableCell>
                                            <TableCell>{pet?.PetName || 'N/A'}</TableCell>
                                            <TableCell>{pet?.SpeciesName || 'N/A'}</TableCell>
                                            <TableCell>{pet?.BreedName || 'N/A'}</TableCell>
                                            <TableCell>
                                                {pet?.DateOfBirth ? format(new Date(pet.DateOfBirth), "PPP") : "Invalid Date"}
                                            </TableCell>

                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" onClick={() => handleEditClick(pet)}>
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px] bg-white">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Pet</DialogTitle>
                                                            <DialogDescription>
                                                                Make changes to pet details here. Click save when you&apos;re done.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="edit-owner" className="text-right">
                                                                    Owner&apos;s Name
                                                                </Label>
                                                                <Input
                                                                    id="edit-owner"
                                                                    value={editingPet?.OwnerName || ""}
                                                                    onChange={(e) => setEditingPet({ ...editingPet, OwnerName: e.target.value })}
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="edit-pet" className="text-right">
                                                                    Pet&apos;s Name
                                                                </Label>
                                                                <Input
                                                                    id="edit-pet"
                                                                    value={editingPet?.PetName || ""}
                                                                    onChange={(e) => setEditingPet({ ...editingPet, PetName: e.target.value })}
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="species" className="text-right">
                                                                    Species
                                                                </Label>
                                                                <Select
                                                                    onValueChange={(value) => {
                                                                        if (editingPet) {
                                                                            setEditingPet({ ...editingPet, SpeciesID: value });
                                                                            setFilteredBreeds(breedList.filter(breed => breed.SpeciesID === value));
                                                                        }
                                                                    }}
                                                                    value={editingPet?.SpeciesID || ""}
                                                                >
                                                                    <SelectTrigger className="col-span-3">
                                                                        <SelectValue placeholder="Select Species" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-white">
                                                                        <SelectGroup>
                                                                            {speciesList.map((species) => (
                                                                                <SelectItem
                                                                                    key={species.SpeciesID}
                                                                                    value={species.SpeciesID}
                                                                                    className="hover:bg-gray-100 hover:text-black"
                                                                                >
                                                                                    {species.SpeciesName}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="breed" className="text-right">
                                                                    Breed
                                                                </Label>
                                                                <Select
                                                                    onValueChange={(value) => {
                                                                        if (editingPet) {
                                                                            setEditingPet({ ...editingPet, BreedID: value });
                                                                        }
                                                                    }}
                                                                    value={editingPet?.BreedID || ""}
                                                                >
                                                                    <SelectTrigger className="col-span-3">
                                                                        <SelectValue placeholder="Select Breed" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-white">
                                                                        <SelectGroup>
                                                                            {filteredBreeds.map((breed) => (
                                                                                <SelectItem
                                                                                    key={breed.BreedID}
                                                                                    value={breed.BreedID}
                                                                                    className="hover:bg-gray-100 hover:text-black"
                                                                                >
                                                                                    {breed.BreedName}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="edit-dob" className="text-right">
                                                                    Date of Birth
                                                                </Label>
                                                                <Input
                                                                    id="edit-dob"
                                                                    type="date"
                                                                    value={editingPet?.DateOfBirth ? format(new Date(editingPet.DateOfBirth), "yyyy-MM-dd") : ""}
                                                                    onChange={(e) => setEditingPet({ ...editingPet, DateOfBirth: e.target.value })}
                                                                    className="col-span-3"
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button type="button" onClick={() => handleEditPet(editingPet.PetID)}>
                                                                Save changes
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>

                                                </Dialog>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="ml-4"
                                                    onClick={async () => handleArchivePet(pet.PetID)}
                                                >
                                                    <Archive className="h-4 w-4 mr-2" />
                                                    Archive
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
